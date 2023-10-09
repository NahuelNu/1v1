import { AnimatedSprite, Graphics, Rectangle, Texture } from "pixi.js";
import { IHitBox } from "../Interfaces/IHitBox";
import { PhysicsContainer } from "../PhysicsContainer";

export class Objective extends PhysicsContainer implements IHitBox {
  private hitbox: Graphics;
  private animatedSprite: AnimatedSprite;

  constructor(textures: Texture[]) {
    super();
    this.animatedSprite = new AnimatedSprite(textures, true);
    this.addChild(this.animatedSprite);
    this.animatedSprite.animationSpeed = 0.1;
    this.hitbox = new Graphics();
    this.hitbox.beginFill(0x0000ff, 0.4);
    this.hitbox.drawRect(
      2.5,
      2,
      this.animatedSprite.width - 4.5,
      this.animatedSprite.height - 4
    );
    this.hitbox.endFill();
    this.hitbox.visible = false;
    this.animatedSprite.addChild(this.hitbox);
  }
  public getHitBox(): Rectangle {
    return this.hitbox.getBounds();
  }

  public play(): void {
    this.animatedSprite.play();
  }
  public stop(): void {
    this.animatedSprite.stop();
  }
}
