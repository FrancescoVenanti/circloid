"use client";
import { addScore } from "@/lib/actions";
import GlobalMixin from "@/src/mixins/global";
import { KeyboardMixin } from "@/src/mixins/keyboard";
import MovingEntity, { IMovingEntity } from "../../core/moving-entity";
import Circle from "../../core/shape/circle";
import Vector from "../../core/vector";
import CycloneUpgrade from "../upgrades/cyclone-upgrade";
import LifeUpgrade from "../upgrades/life-upgrade";
import ShieldUpgrade from "../upgrades/shield.upgrade";
import SpeedUpgrade from "../upgrades/speed-upgrade";

interface IPlayer extends Omit<IMovingEntity<Circle>, "shape" | "key"> {
  lives: number;
  points?: number;
  credits?: number;
  vect: Vector;
}
class Player extends GlobalMixin(KeyboardMixin(MovingEntity<Circle>)) {
  public livesUpgrade: LifeUpgrade;
  public speedUpgrade: SpeedUpgrade;
  public cyclone: CycloneUpgrade;
  public shield: ShieldUpgrade;
  public points: number;
  public credits: number;
  constructor({ vect, angle, speed, lives, points, credits }: IPlayer) {
    const shape = new Circle({ vect: vect, radius: 35 });
    super({ shape, key: "player", angle, speed });
    this.speedUpgrade = new SpeedUpgrade({
      maxLevel: 10,
      cost: 3,
      vector: this.global("buttonPosition").clone(),
      initialValue: speed,
      costMultiplier: 2,
      label: "Speed",
      keyPress: "1",
    });
    this.zIndex = 1000;

    this.livesUpgrade = new LifeUpgrade({
      maxLevel: 5,
      cost: 5,
      vector: this.global("buttonPosition").clone().addX(200),
      initialValue: lives,
      label: "Life",
      keyPress: "3",
      // color: "red",
    });
    this.cyclone = new CycloneUpgrade({
      maxLevel: 5,
      cost: 5,
      vector: this.global("buttonPosition").clone().addX(400),
      initialValue: 0,
      label: "Cyclone",
      keyPress: "5",
      costMultiplier: 2,
      rotationSpeed: 3,
      radius: 12,
      padding: 24,
      // color: "violet",
    });
    this.shield = new ShieldUpgrade({
      maxLevel: 5,
      cost: 5,
      costMultiplier: 2,
      vector: this.global("buttonPosition").clone().addX(500),
      initialValue: 0,
      label: "Shield",
      keyPress: "6",
      // costMultiplier: 2,
    });

    this.points = points || 0;
    this.credits = credits || 0;
    this.store();
    this.speedUpgrade.store();
    this.livesUpgrade.store();
    this.cyclone.store();
    this.shield.store();
    this.animate().after(() => console.log("player animation"), 1000);
  }

  public reset() {
    this.points = 0;
    this.livesUpgrade.reset();
    this.credits = 0;
    this.speedUpgrade.reset();
    this.speed = this.speedUpgrade.value;
    this.cyclone.reset();
    this.shape.vector = this.canvasShape.center.clone();

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

    const vector = Vector.fromAngle(this.angle);
    vector.mulScalar(this.speed);

    this.shape.vector.add(vector);
    this.preventEscape(newDirection);
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

    vector.mulScalar(maxDistance);

    newPosition.add(vector);

    this.shape.vector.set(newPosition);
    return true;
  }

  private death() {
    this.sound.play("death");
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
  }

  public decreaseLife() {
    this.livesUpgrade.value--;
  }

  public override draw(): void {
    this.with(() => this.shape.draw(), this.style);
    // this.with(
    //   () => this.drawer.sketchy.circle(this.shape.vector, this.shape.radius),
    //   this.style
    // );
    this.drawCredits();
    this.drawPoints();
    this.drawLives();
  }

  private drawPoints() {
    this.with(
      () =>
        this.text(
          "POINTS: " + this.points.toString(),
          this.canvasShape.topLeft.clone().addScalar(60),
          {
            font: "50px monospace",
          }
        ),
      this.getCurrentStyle()["credits"] || {}
    );
  }

  private drawCredits() {
    this.with(
      () =>
        this.text(
          "CREDITS: " + this.credits.toString(),
          this.canvasShape.topLeft.clone().addScalar(120).addX(-60),
          {
            font: "50px monospace",
          }
        ),
      this.getCurrentStyle()["credits"] || {}
    );
  }

  private drawLives() {
    for (let i = 0; i < this.livesUpgrade.value; i++) {
      this.with(() => this.drawLife(i), this.getCurrentStyle()["lifes"] || {});
    }
  }
  private drawLife(index: number) {
    this.drawer.drawHeart(
      this.canvasShape.topRight
        .clone()
        .addX(-60 * (index + 1))
        .addY(60),
      30
    );
  }
}

export default Player;
