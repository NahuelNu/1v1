import { Container, Sprite, Texture } from "pixi.js";
import { Button } from "../ui/Button";
import { GameScene } from "./GameScene";

export class PauseScene extends Container {
  private background: Sprite;
  private btnPlay: Button;

  constructor() {
    super();
    this.background = new Sprite(Texture.from("menuBg"));
    this.addChild(this.background);

    this.btnPlay = new Button(
      Texture.from("playIcon"),
      Texture.from("playIconDown"),
      this.onClickPlay.bind(this)
    );

    this.background.addChild(this.btnPlay);
  }

  private onClickPlay() {
    (this.parent as GameScene).resume();
  }
}
