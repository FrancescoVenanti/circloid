import express from "express";
import { createServer as createViteServer } from "vite";

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: app,
  });

  app.post("/score", async (req, res) => {});

  app.use(vite.middlewares);

  app.use("*", async (req, res) => {});

  app.listen(3000, () => console.log("Server start on port 3000."));
}

createServer();
