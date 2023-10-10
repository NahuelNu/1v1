import { Container, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { Button } from "../ui/Button";
import { GameScene } from "./GameScene";
import { Manager } from "../Manager";
import { MenuScene } from "./MenuScene";
import { sound } from "@pixi/sound";

export class PauseScene extends Container {
  private background: Sprite;
  private btnPlay: Button;
  private btnHome: Button;
  private btnRepeat: Button;
  private textPause: Text;

  constructor() {
    super();
    this.background = new Sprite(
      Texture.from(
        "Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Panel/Window/Medium.png"
      )
    );
    this.addChild(this.background);

    this.btnPlay = new Button(
      Texture.from(
        "Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Buttons/Rect-Medium/PlayIcon/Default.png"
      ),
      Texture.from(
        "Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Buttons/Rect-Medium/PlayIcon/Hover.png"
      ),
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
      Texture.from(
        "Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Buttons/Square-Medium/Home/Default.png"
      ),
      Texture.from(
        "Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Buttons/Square-Medium/Home/Default.png"
      ),
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
      Texture.from(
        "Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Buttons/Square-Medium/Repeat/Default.png"
      ),
      Texture.from(
        "Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Buttons/Square-Medium/Repeat/Default.png"
      ),
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

    this.textPause = new Text(
      "PAUSE",
      new TextStyle({
        fontFamily: "fontRubikBold",
        fontSize: "37px",
        fontWeight: "bolder",
        fill: "white",
      })
    );
    this.background.addChild(this.textPause);
    this.textPause.position.set(
      (this.background.width - this.textPause.width) / 2,
      this.background.height / 9
    );

    this.background.scale.set(0.6);
  }

  private onClickPlay() {
    (this.parent as GameScene).resume();
  }

  private onClickHome() {
    sound.resumeAll();
    sound.stop("gameMusic1");

    Manager.changeScene(new MenuScene());
  }
  private onClickRepeat() {
    sound.resumeAll();
    sound.stop("gameMusic1");
    Manager.changeScene(new GameScene());
  }
}
