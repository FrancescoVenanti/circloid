"use client";
import { addScore } from "@/actions";
import Canvas from "../../core/canvas";
import Drawer from "../../core/drawer";
import MovingEntity, { IMovingEntity } from "../../core/moving-entity";
import Circle from "../../core/shape/circle";
import Vector from "../../core/vector";
import Explosion from "../effects/explosion";
import LifeUpgrade from "../upgrades/life-upgrade";
import SpeedUpgrade from "../upgrades/speed-upgrade";
import Constraint from "./constraint";

interface IPlayer extends Omit<IMovingEntity<Circle>, "shape" | "key"> {
  lives: number;
  points?: number;
  credits?: number;
  vect: Vector;
}
class Player extends MovingEntity<Circle> {
  private lives: LifeUpgrade;
  private speedUpgrade: SpeedUpgrade;
  public points: number;
  public credits: number;
  constructor({ vect, angle, speed, lives, points, credits }: IPlayer) {
    const shape = new Circle({ vect: vect, radius: 35 });
    super({ shape, key: "player", angle, speed });
    this.lives = new LifeUpgrade({
      maxLevel: 10,
      cost: 10,
      vector: Vector.zero,
      initialValue: lives,
    });
    this.speedUpgrade = new SpeedUpgrade({
      maxLevel: 10,
      cost: 10,
      vector: Vector.zero,
      initialValue: speed,
    });
    this.points = points || 0;
    this.credits = credits || 0;
    this.store();
    this.listenKeyboard();
  }

  private listenKeyboard() {
    window.addEventListener("keydown", (e) => {
      const keys = new Set(["w", "a", "s", "d"]);
      if (keys.has(e.key)) this.keyMap.add(e.key);
      if (e.key == "1") this.upgradeSpeed();
      if (e.key == "2") this.upgradeConstraint();
    });
    window.addEventListener("keyup", (e) => {
      this.keyMap.delete(e.key);
    });
  }

  private keyMap: Set<String> = new Set();

  public reset() {
    this.points = 0;
    this.lives.valueOf = 3;
    this.credits = 0;
    this.speed = 3;
    this.speedUpgrade.valueOf = 3;
    this.shape.vector = Canvas.instance.rect.center.clone();
    Canvas.instance.get("constraint")?.destroy();
    new Constraint({ vect: Canvas.instance.rect.center, radius: 120 });
  }

  public setScore() {
    this.points++;
    this.credits++;
  }

  private move() {
    const directions: Record<string, Vector> = {
      a: new Vector(-1, 0),
      d: new Vector(1, 0),
      w: new Vector(0, -1),
      s: new Vector(0, 1),
    };

    const newDirection = Object.keys(directions)
      .filter((key) => this.keyMap.has(key))
      .reduce((acc, key) => acc.add(directions[key]), new Vector(0, 0));

    if (newDirection.isZero()) return;

    this.angle = newDirection.atan2();
    this.shape.vector.add(Vector.fromAngle(this.angle).mulScalar(this.speed));

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
    this.reset();
  }

  public async postResults() {
    this.keyMap.clear();
    const name = prompt("Insert your name: ");
    const body = {
      name: name || "Unknown",
      score: this.points,
    };

    try {
      await addScore(body);
    } catch (e) {
      console.log(e);
    }
  }

  public update(): void {
    if (this.lives.valueOf < 1) {
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
    for (const ball of balls) {
      if (!(ball.shape instanceof Circle) || !(this.shape instanceof Circle))
        continue;
      const distance = ball.shape.vector.distance(this.shape.vector);
      const maxDistance = ball.shape.radius + this.shape.radius;
      if (distance <= maxDistance) {
        ball.destroy();
        this.explode(ball.shape.vector);
        this.lives.valueOf--;
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

  private drawLives() {
    for (let i = 0; i < this.lives.valueOf; i++) {
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
      this.speedUpgrade.upgrade();
      this.speed = this.speedUpgrade.valueOf;
      this.credits -= 10;
    }
  }

  private upgradeConstraint(): void {
    if (this.credits < 10) return;
    const constraint = Canvas.instance.get("constraint");
    if (!constraint) return;
    if (!(constraint.shape instanceof Circle)) return;
    if (!(constraint instanceof Constraint)) return;
    constraint.upgradeRadius();
    this.credits -= 10;
  }
}

export default Player;
