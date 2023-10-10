import { Container, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { IScene } from "../Interfaces/IScene";
import { Button } from "../ui/Button";
import { GameScene } from "./GameScene";

import { Manager } from "../Manager";
import { MenuScene } from "./MenuScene";
import { sound } from "@pixi/sound";

export class WinScene extends Container implements IScene {
  private background: Sprite;
  private window: Sprite;
  private btnHome: Button;
  private btnRepeat: Button;
  private textPause: Text;

  constructor(winner: Number, backgr: Sprite) {
    super();
    this.background = backgr;
    this.addChild(this.background);

    this.window = new Sprite(
      Texture.from(
        "Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Panel/Window/Medium.png"
      )
    );
    this.addChild(this.window);

    this.btnHome = new Button(
      Texture.from(
        "Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Buttons/Square-Medium/Home/Default.png"
      ),
      Texture.from(
        "Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Buttons/Square-Medium/Home/Default.png"
      ),
      this.onClickHome.bind(this)
    );
    this.window.addChild(this.btnHome);
    this.btnHome.position.set(
      this.window.width / 2 - 1.5 * this.btnHome.width,
      this.window.height - this.btnHome.height - 0.15 * this.window.height
    );

    this.btnRepeat = new Button(
      Texture.from(
        "Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Buttons/Square-Medium/Repeat/Default.png"
      ),
      Texture.from(
        "Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Buttons/Square-Medium/Repeat/Default.png"
      ),
      this.onClickRepeat.bind(this)
    );
    this.window.addChild(this.btnRepeat);
    this.btnRepeat.position.set(
      this.window.width / 2 + this.btnHome.width / 2,
      this.window.height - this.btnHome.height - 0.15 * this.window.height
    );

    this.textPause = new Text(
      `PLAYER ${winner} WIN!!!`,
      new TextStyle({
        fontFamily: "fontRubikBold",
        fontSize: "37px",
        fontWeight: "bolder",
        fill: "white",
      })
    );
    this.window.addChild(this.textPause);
    this.textPause.position.set(
      (this.window.width - this.textPause.width) / 2,
      this.window.height / 9
    );

    this.window.scale.set(0.6);
    this.window.position.set(
      (Manager.WIDTH - this.window.width) / 2,
      (Manager.HEIGHT - this.window.height) / 2
    );

    sound.play("gameMusic2", { loop: true, volume: 0.5, singleInstance: true });
  }

  private onClickHome() {
    sound.stop("gameMusic2");

    Manager.changeScene(new MenuScene());
  }
  private onClickRepeat() {
    sound.stop("gameMusic2");
    Manager.changeScene(new GameScene());
  }

  update(_deltaFrame: number, _deltaTime: number): void {}
}
