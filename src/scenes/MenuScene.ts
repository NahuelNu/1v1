import { Container, NineSlicePlane, Texture } from "pixi.js";
import { IScene } from "../Interfaces/IScene";
import { Button } from "../ui/Button";
import { GameScene } from "./GameScene";
import { Manager } from "../Manager";

export class MenuScene extends Container implements IScene {
  private background: NineSlicePlane;
  private btnPlay: Button;
  constructor() {
    super();

    this.background = new NineSlicePlane(Texture.from("menuBg"), 2, 2, 2, 2);
    this.btnPlay = new Button(
      Texture.from("play"),
      Texture.from("playDown"),
      this.onClickPause.bind(this)
    );
    this.background.addChild(this.btnPlay);
    this.addChild(this.background);
  }

  update(_deltaFrame: number, _deltaTime: number): void {
    //Hace algo?
  }

  private onClickPause() {
    Manager.changeScene(new GameScene());
  }
}
