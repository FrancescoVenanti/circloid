"use client";
import { addScore } from "@/actions";
import { KeyboardMixin } from "@/src/mixins/keyboard";
import Canvas from "../../core/canvas";
import Drawer from "../../core/drawer";
import MovingEntity, { IMovingEntity } from "../../core/moving-entity";
import Circle from "../../core/shape/circle";
import Vector from "../../core/vector";
import Explosion from "../effects/explosion";
import LifeUpgrade from "../upgrades/life-upgrade";
import SpeedUpgrade from "../upgrades/speed-upgrade";
import Constraint from "./constraint";
import GLOBAL from "@/src/core/global";

interface IPlayer extends Omit<IMovingEntity<Circle>, "shape" | "key"> {
  lives: number;
  points?: number;
  credits?: number;
  vect: Vector;
}
class Player extends KeyboardMixin(MovingEntity<Circle>) {
  private livesUpgrade: LifeUpgrade;
  private speedUpgrade: SpeedUpgrade;
  public points: number;
  public credits: number;
  constructor({ vect, angle, speed, lives, points, credits }: IPlayer) {
    const shape = new Circle({ vect: vect, radius: 35 });
    super({ shape, key: "player", angle, speed });
    this.speedUpgrade = new SpeedUpgrade({
      maxLevel: 10,
      cost: 10,
      vector: GLOBAL("buttonPosition").clone(),
      initialValue: speed,
      label: "Speed",
      keyPress: "1",
    });

    this.livesUpgrade = new LifeUpgrade({
      maxLevel: 5,
      cost: 5,
      vector: GLOBAL("buttonPosition").clone().addX(200),
      initialValue: lives,
      label: "Life",
      keyPress: "3",
    });

    this.points = points || 0;
    this.credits = credits || 0;
    this.store();
    this.speedUpgrade.store();
    this.livesUpgrade.store();
    this.listenKeyboard();
  }

  private listenKeyboard() {
    window.addEventListener("keydown", (e) => {
      const keys = new Set([
        "w",
        "a",
        "s",
        "d",
        "ArrowRight",
        "ArrowLeft",
        "ArrowUp",
        "ArrowDown",
      ]);
      if (keys.has(e.key)) this.keyMap.add(e.key);
      if (e.key == "1") this.upgradeSpeed();
      if (e.key == "2") this.upgradeConstraint();
      if (e.key == "3") this.upgradeLives();
    });
    window.addEventListener("keyup", (e) => {
      this.keyMap.delete(e.key);
    });
  }

  private keyMap: Set<String> = new Set();

  public reset() {
    this.points = 0;
    this.livesUpgrade.reset();
    this.credits = 0;
    this.speed = 3;
    this.speedUpgrade.reset();
    this.shape.vector = Canvas.instance.rect.center.clone();
    const constraints = Canvas.instance.getByConstructor(Constraint);
    if (constraints.length != 1) {
      throw new Error(`Unexpected constraints in canvas ${constraints.length}`);
    }
    constraints[0].reset();
  }

  public setScore() {
    this.points++;
    this.credits++;
  }

  private move() {
    const directions: Record<string, Vector> = {
      a: new Vector(-1, 0),
      ArrowLeft: new Vector(-1, 0),
      d: new Vector(1, 0),
      ArrowRight: new Vector(1, 0),
      w: new Vector(0, -1),
      ArrowUp: new Vector(0, -1),
      s: new Vector(0, 1),
      ArrowDown: new Vector(0, 1),
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
    const explosion = new Explosion(vect.clone(), ["lightblue", "coral"]);
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
    if (this.livesUpgrade.value < 1) {
      this.death();
    }
    this.move();
    this.collisions();
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
        this.livesUpgrade.value--;
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
    // Drawer.instance.with(
    //   () =>
    //     Drawer.instance.sketchyCircle(
    //       this.shape.vector,
    //       this.shape.radius + 10
    //     ),
    //   {
    //     strokeStyle: "skyblue",
    //     lineWidth: 10,
    //   }
    // );
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
    for (let i = 0; i < this.livesUpgrade.value; i++) {
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

  private upgradeSpeed(): void {
    if (this.credits < this.speedUpgrade.cost) return;
    if (this.speedUpgrade.upgrade()) {
      this.credits -= this.speedUpgrade.cost;
    }
    this.speed = this.speedUpgrade.value;
  }

  private upgradeLives(): void {
    if (this.credits < this.livesUpgrade.cost) return;
    if (this.livesUpgrade.upgrade()) {
      this.credits -= this.livesUpgrade.cost;
    }
    this.speed = this.speedUpgrade.value;
  }

  private upgradeConstraint(): void {
    const constraint = Canvas.instance.getByConstructor(Constraint)[0];
    if (!constraint) return;
    if (this.credits < constraint.radiusUpgrade.cost) return;
    if (!(constraint.shape instanceof Circle)) return;
    if (constraint.upgradeRadius())
      this.credits -= constraint.radiusUpgrade.cost;
  }
}

export default Player;
