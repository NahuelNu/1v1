import { Container, Sprite, Texture } from "pixi.js";
import { IScene } from "../Interfaces/IScene";
import { Button } from "../ui/Button";
import { GameScene } from "./GameScene";
import { Manager } from "../Manager";

export class MenuScene extends Container implements IScene {
  private btnPlay: Button;
  private logo: Sprite;
  constructor() {
    super();

    this.btnPlay = new Button(
      Texture.from("play"),
      Texture.from("playDown"),
      this.onClickPause.bind(this)
    );
    this.btnPlay.scale.set(0.5);
    this.btnPlay.position.set(
      (Manager.WIDTH - this.btnPlay.width) / 2,
      ((Manager.HEIGHT - this.btnPlay.height) * 3) / 5
    );
    this.addChild(this.btnPlay);

    this.logo = Sprite.from("1v1");
    this.logo.scale.set(0.6);
    this.logo.position.set(
      (Manager.WIDTH - this.logo.width) / 2,
      (Manager.HEIGHT - this.logo.height) / 4
    );
    this.addChild(this.logo);
  }

  update(_deltaFrame: number, _deltaTime: number): void {
    //Hace algo?
  }

  private onClickPause() {
    Manager.changeScene(new GameScene());
  }
}
