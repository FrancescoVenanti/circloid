"use client";
import { addScore } from "@/lib/actions";
import GlobalMixin from "@/src/mixins/global";
import { KeyboardMixin } from "@/src/mixins/keyboard";
import Canvas from "../../core/canvas";
import Drawer from "../../core/drawer";
import MovingEntity, { IMovingEntity } from "../../core/moving-entity";
import Circle from "../../core/shape/circle";
import Vector from "../../core/vector";
import Explosion from "../effects/explosion";
import LifeUpgrade from "../upgrades/life-upgrade";
import SpeedUpgrade from "../upgrades/speed-upgrade";
import Upgrade from "../upgrades/upgrades";
import BallEnemy from "./ball-enemy";

interface IPlayer extends Omit<IMovingEntity<Circle>, "shape" | "key"> {
  lives: number;
  points?: number;
  credits?: number;
  vect: Vector;
}
class Player extends GlobalMixin(KeyboardMixin(MovingEntity<Circle>)) {
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
      vector: this.global("buttonPosition").clone(),
      initialValue: speed,
      label: "Speed",
      keyPress: "1",
    });

    this.livesUpgrade = new LifeUpgrade({
      maxLevel: 5,
      cost: 5,
      vector: this.global("buttonPosition").clone().addX(200),
      initialValue: lives,
      label: "Life",
      keyPress: "3",
    });

    this.points = points || 0;
    this.credits = credits || 0;
    this.store();
    this.speedUpgrade.store();
    this.livesUpgrade.store();
  }
  public override onKeyDown(e: KeyboardEvent): void {
    super.onKeyDown(e);
    if (e.key == "1") this.upgradeSpeed();
    if (e.key == "2") this.upgradeConstraint();
    if (e.key == "3") this.powerup(this.livesUpgrade);
  }

  public reset() {
    this.points = 0;
    this.livesUpgrade.reset();
    this.credits = 0;
    this.speed = 3;
    this.speedUpgrade.reset();
    this.shape.vector = Canvas.instance.rect.center.clone();

    const constraints = this.global("constraint")!;

    constraints.reset();
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
      .filter((key) => this.keyPressed.has(key))
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
    const constraint = this.global("constraint");
    if (!constraint) return;
    const center = constraint.shape.vector;
    const distance = center.distance(this.shape.vector);
    const maxDistance = constraint.shape.radius - this.shape.radius;

    if (distance + direction.distance(new Vector(0, 0)) <= maxDistance) {
      return false;
    }

    const vector = center.angle(this.shape.vector);

    const newPosition = center.clone();

    newPosition.add(vector.mulScalar(maxDistance));

    this.shape.vector.set(newPosition);
    return true;
  }

  private death() {
    this.postResults();
    this.reset();
  }

  public async postResults() {
    this.keyPressed.clear();
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
  }

  public collisions() {
    const balls = Canvas.instance.getByConstructor(BallEnemy);
    for (const ball of balls) {
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
    };

    Drawer.instance.with(() => this.shape.draw(), style);
    this.drawCredits();
    this.drawPoints();
    this.drawLives();
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
      Drawer.instance.with(() => this.drawLife(i), {
        fill: true,
        fillStyle: "red",
      });
    }
  }
  private drawLife(index: number) {
    Drawer.instance.drawHeart(
      Canvas.instance.rect.topRight
        .clone()
        .addX(-60 * (index + 1))
        .addY(60),
      30
    );
  }

  private upgradeSpeed(): void {
    this.powerup(this.speedUpgrade);
    this.speed = this.speedUpgrade.value;
  }

  private upgradeConstraint(): void {
    const constraint = this.global("constraint")!;
    if (constraint.upgradeRadius()) {
      this.decreaseCredits(constraint.radiusUpgrade);
    }
  }

  private powerup(upgrade: Upgrade<any>) {
    if (upgrade.upgrade()) {
      this.decreaseCredits(upgrade);
    }
  }
  private decreaseCredits(upgrade: Upgrade<any>) {
    if (this.credits < upgrade.cost) return;
    this.credits -= upgrade.cost;
  }
}

export default Player;
