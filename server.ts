import express from "express";
import { createServer as createViteServer } from "vite";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";

async function createServer() {
  const app = express();
  app.use(express.json());

  console.log("Setting up Vite...");

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  console.log("Connecting to SQLite...");
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS highscore (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      score INTEGER
    )
  `);

  app.post("/score", async (req, res) => {
    const { name, score } = req.body;
    if (!name || typeof score !== "number") {
      res.status(400).json({ error: "Invalid data" });
      return;
    }
    await db.run("INSERT INTO highscore (name, score) VALUES (?, ?)", [
      name,
      score,
    ]);
    res.json({ res: "ok" });
  });

  app.get("/score", async (req, res) => {
    const scores = await db.all(
      "SELECT * FROM highscore ORDER BY score DESC LIMIT 10"
    );
    res.json(scores);
  });

  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    try {
      const indexPath = path.resolve(__dirname, "index.html");

      let html = fs.readFileSync(indexPath, "utf-8");

      html = await vite.transformIndexHtml(req.originalUrl, html);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (err) {
      next(err);
    }
  });

  app.listen(3000, () =>
    console.log("🚀 Server running at http://localhost:3000")
  );
}

createServer().catch((err) => {
  console.error("❌ Error starting server:", err);
});
