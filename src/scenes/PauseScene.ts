import { Container, Sprite, Texture } from "pixi.js";
import { Button } from "../ui/Button";
import { GameScene } from "./GameScene";
import { Manager } from "../Manager";
import { MenuScene } from "./MenuScene";

export class PauseScene extends Container {
  private background: Sprite;
  private btnPlay: Button;
  private btnHome: Button;
  private btnRepeat: Button;

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

    this.btnPlay.position.set(
      (this.background.width - this.btnPlay.width) / 2,
      this.background.height -
        this.btnPlay.height -
        0.15 * this.background.height
    );

    this.btnHome = new Button(
      Texture.from("home"),
      Texture.from("home"),
      this.onClickHome.bind(this)
    );
    this.background.addChild(this.btnHome);
    this.btnHome.position.set(
      (this.btnPlay.x - this.btnHome.width) / 2,
      this.background.height -
        this.btnHome.height -
        0.15 * this.background.height
    );

    this.btnRepeat = new Button(
      Texture.from("repeat"),
      Texture.from("repeat"),
      this.onClickRepeat.bind(this)
    );
    this.background.addChild(this.btnRepeat);
    this.btnRepeat.position.set(
      this.background.width -
        this.btnPlay.x +
        (this.btnPlay.x - this.btnRepeat.width) / 2,
      this.background.height -
        this.btnHome.height -
        0.15 * this.background.height
    );

    this.background.scale.set(0.6);
  }

  private onClickPlay() {
    (this.parent as GameScene).resume();
  }

  private onClickHome() {
    Manager.changeScene(new MenuScene());
  }
  private onClickRepeat() {
    Manager.changeScene(new GameScene());
  }
}
