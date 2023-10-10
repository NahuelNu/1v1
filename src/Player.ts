import { AnimatedSprite, Graphics, Rectangle, Texture } from "pixi.js";
import { IHitBox } from "./Interfaces/IHitBox";
import { PhysicsContainer } from "./PhysicsContainer";
import { sound } from "@pixi/sound";

export class Player extends PhysicsContainer implements IHitBox {
  private static readonly GRAVITY = 300;
  protected static readonly MOVE_SPEED = 250;
  private static readonly JUMP_SPEED = -350;

  protected playerAnimated: AnimatedSprite;
  private canJump: boolean;
  private hitbox: Graphics;

  constructor(textures: Texture[]) {
    super();
    this.playerAnimated = new AnimatedSprite(textures, false);

    this.hitbox = new Graphics();
    this.hitbox.beginFill(0xff00ff, 0.4);
    this.hitbox.drawRect(
      1.5,
      0,
      this.playerAnimated.width - 3,
      this.playerAnimated.height
    );
    this.hitbox.endFill();
    this.playerAnimated.addChild(this.hitbox);
    this.hitbox.visible = false;

    this.playerAnimated.animationSpeed = 0.1;
    this.playerAnimated.play();
    this.addChild(this.playerAnimated);

    this.accelerate.y = Player.GRAVITY;
    this.canJump = false;
  }

  public getHitBox(): Rectangle {
    return this.hitbox.getBounds();
  }

  protected jump() {
    if (this.canJump) {
      this.canJump = false;
      this.speed.y = Player.JUMP_SPEED;
      this.accelerate.y = Player.GRAVITY;
      sound.play("jump", { singleInstance: true, volume: 1 });
    }
  }

  public setcanJump(): void {
    this.canJump = true;
  }

  public separate(overlap: Rectangle, plat: PhysicsContainer) {
    if (overlap.width < overlap.height) {
      if (this.x < plat.x) this.x -= overlap.width;
      else if (this.x > plat.x) this.x += overlap.width;
    } else if (overlap.width > overlap.height) {
      if (this.y < plat.y) {
        this.setcanJump();
        this.y -= overlap.height;
      } else if (this.y > plat.y) {
        this.y += overlap.height;
      }
      this.speed.y = 0;
    }
  }

  public separatePlayer(player2: Player, overlap: Rectangle) {
    if (overlap.width < overlap.height) {
      if (this.x < player2.x) {
        this.x -= overlap.width / 2;
      } else this.x += overlap.width / 2;
    } else {
      if (this.y < player2.y) {
        this.y -= overlap.height;
        this.speed.y = 0;
      } else {
        this.speed.y /= 2;
      }
    }
  }
}
