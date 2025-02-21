"use client";
import Canvas from "../../core/canvas";
import Drawer from "../../core/drawer";
import MovingEntity from "../../core/moving-entity";
import Circle from "../../core/shape/circle";
import Vector from "../../core/vector";
import Explosion from "../effects/explosion";

class Player extends MovingEntity<Circle> {
  constructor(
    zIndex: number,
    vector: Vector,
    angle: number,
    speed: number,
    public lives: number,
    public points: number,
    public credits: number
  ) {
    super(zIndex, new Circle(vector, 40), angle, speed);
    this.key = "player";
    this.store();
    this.listenKeyboard();
  }

  private listenKeyboard() {
    window.addEventListener("keydown", (e) => {
      const keys = new Set(["w", "a", "s", "d"]);
      if (keys.has(e.key)) {
        this.keyMap.add(e.key);
      }
      if (e.key == "1") {
        this.upgradeSpeed();
        console.log(this.speed);
      }
      if (e.key == "2") {
        this.upgradeConstraint();
        console.log(this.speed);
      }
    });
    window.addEventListener("keyup", (e) => {
      this.keyMap.delete(e.key);
    });
  }

  private keyMap: Set<String> = new Set();

  private move() {
    const x = ["a", "d"];
    const y = ["w", "s"];
    const newDirection = new Vector(0, 0);
    if (this.keyMap.has(x[0])) {
      newDirection.x = -1;
    }
    if (this.keyMap.has(x[1])) {
      newDirection.x += 1;
    }
    if (this.keyMap.has(y[0])) {
      newDirection.y = -1;
    }
    if (this.keyMap.has(y[1])) {
      newDirection.y += 1;
    }

    if (newDirection.y === 0 && newDirection.x === 0) return;

    this.angle = newDirection.atan2();

    const direction = Vector.fromAngle(this.angle).mulScalar(this.speed);

    this.shape.vector.add(direction);

    this.preventEscape(newDirection);
  }

  private explode(vect: Vector) {
    const explosion = new Explosion(vect.clone());
    explosion.store();
  }

  private preventEscape(direction: Vector) {
    const constraint = Canvas.instance.get<Circle>("constraint");
    if (!constraint) return;
    const center = constraint.shape.vector;
    const distance = center.distance(this.shape.vector);
    const maxDistance = constraint.shape.radius - this.shape.radius;

    if (distance + direction.distance(new Vector(0, 0)) > maxDistance) {
      const vector = center.angle(this.shape.vector);

      const newPosition = center.clone();

      newPosition.add(vector.mulScalar(maxDistance));

      this.shape.vector.set(newPosition);
      return true;
    }
    return false;
  }

  private death() {
    this.postResults();
    this.lives = 3;
    this.points = 0;
    this.credits = 0;
  }

  public async postResults() {
    const name = prompt("Insert your name: ");
    const body = {
      name: name,
      score: this.points,
    };
    const res = await fetch("/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  public update(): void {
    if (this.lives < 1) {
      this.death();
    }
    this.move();
    this.collisions();
    this.increaseSpeedButton();
    this.increaseConstraintButton();
    this.drawCredits();
    this.drawPoints();
    this.drawLives();
  }

  public collisions() {
    const balls = Canvas.instance.startsWith("ballenemy");
    console.log("get balls, number: " + balls.length);
    for (const ball of balls) {
      if (!(ball.shape instanceof Circle) || !(this.shape instanceof Circle))
        continue;
      const distance = ball.shape.vector.distance(this.shape.vector);
      const maxDistance = ball.shape.radius + this.shape.radius;

      console.log("Before check" + distance, maxDistance);
      if (distance <= maxDistance) {
        console.log("player collided");
        ball.destroy();
        // Drawer.instance.drawExplosion(
        //   new Vector(this.shape.vector.x, this.shape.vector.y),
        //   100
        // );
        this.explode(ball.shape.vector);
        this.lives--;
      }
    }
  }

  public override draw(): void {
    const style = {
      fillStyle: "lightblue",
      fill: true,
      strokeStyle: "lightblue",
    };

    Drawer.instance.with(() => this.shape.draw(), style);
  }

  private drawPoints() {
    const style = {
      fillStyle: "white",
      fill: true,
    };

    Drawer.instance.with(
      () =>
        Drawer.instance.text(
          "POINTS: " + this.points.toString(),
          Canvas.instance.rect.topLeft.clone().addScalar(60),
          {
            font: "50px monospace",
          }
        ),
      style
    );
  }

  private drawCredits() {
    Drawer.instance.with(
      () =>
        Drawer.instance.text(
          "CREDITS: " + this.credits.toString(),
          Canvas.instance.rect.topLeft.clone().addScalar(120).addX(-60),
          {
            font: "50px monospace",
          }
        ),
      {
        fillStyle: "white",
        fill: true,
      }
    );
  }

  private drawMaxScore() {}

  private drawLives() {
    for (let i = 0; i < this.lives; i++) {
      Drawer.instance.with(
        () =>
          Drawer.instance.drawHeart(
            Canvas.instance.rect.topRight
              .clone()
              .addX(-60 - 60 * i)
              .addY(60),
            30
          ),
        {
          fill: true,
          fillStyle: "red",
        }
      );
    }
  }

  public increaseSpeedButton() {
    Drawer.instance.with(
      () =>
        Drawer.instance.drawButton(
          Canvas.instance.rect.bottomLeft.clone().addY(-100).addX(100),
          40,
          "1"
        ),
      {
        fill: false,
        fillStyle: "white",
      }
    );
    Drawer.instance.text(
      "Speed",
      Canvas.instance.rect.bottomLeft.clone().addY(-60).addX(90)
    );
  }

  public increaseConstraintButton() {
    Drawer.instance.with(
      () =>
        Drawer.instance.drawButton(
          Canvas.instance.rect.bottomLeft.clone().addY(-100).addX(200),
          40,
          "2"
        ),
      {
        fill: false,
        fillStyle: "white",
      }
    );
    Drawer.instance.text(
      "Constraint",
      Canvas.instance.rect.bottomLeft.clone().addY(-60).addX(170)
    );
  }

  private upgradeSpeed(): void {
    if (this.credits >= 10) {
      this.speed = this.speed + 1;
      this.credits -= 10;
    }
  }
  private upgradeConstraint(): void {
    if (this.credits < 10) return;
    const constraint = Canvas.instance.get("constraint");
    if (!constraint) return;
    if (!(constraint.shape instanceof Circle)) return;
    constraint.shape.radius += 5;
    this.credits -= 10;
  }
}

export default Player;
