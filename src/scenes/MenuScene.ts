import { Container, Sprite, Texture } from "pixi.js";
import { IScene } from "../Interfaces/IScene";
import { Button } from "../ui/Button";
import { GameScene } from "./GameScene";
import { Manager } from "../Manager";
import { sound } from "@pixi/sound";

export class MenuScene extends Container implements IScene {
  private btnPlay: Button;
  private logo: Sprite;
  private background: Sprite;
  private btnSound: Button;

  constructor() {
    super();
    this.background = Sprite.from("Backgrounds/dawnbackground.png");
    this.background.alpha = 0.7;
    this.addChild(this.background);

    this.btnPlay = new Button(
      Texture.from(
        "Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Buttons/Rect-Medium/PlayText/Default.png"
      ),
      Texture.from(
        "Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Buttons/Rect-Medium/PlayText/Hover.png"
      ),
      this.onClickPlay.bind(this)
    );
    this.btnPlay.scale.set(0.5);
    this.btnPlay.position.set(
      (Manager.WIDTH - this.btnPlay.width) / 2,
      ((Manager.HEIGHT - this.btnPlay.height) * 3) / 5
    );
    this.addChild(this.btnPlay);

    this.logo = Sprite.from("1v1.png");
    this.logo.scale.set(0.6);
    this.logo.position.set(
      (Manager.WIDTH - this.logo.width) / 2,
      (Manager.HEIGHT - this.logo.height) / 4
    );
    this.addChild(this.logo);

    this.btnSound = new Button(
      Texture.from("UI/Icons/Icon_Small_Blank_Audio.png"),
      Texture.from("UI/Icons/Icon_Small_WhiteOutline_Audio.png"),
      this.onClickSound.bind(this)
    );

    this.addChild(this.btnSound);
    this.btnSound.scale.set(0.15);
    this.btnSound.position.set(15, Manager.HEIGHT - this.btnSound.height - 15);

    sound.play("menuMusic1", { volume: 0.3, singleInstance: true, loop: true });
  }

  private onClickSound() {
    if (sound.isPlaying()) {
      this.btnSound.changeTextures(
        Texture.from("UI/Icons/Icon_Small_Blank_AudioOff.png"),
        Texture.from("UI/Icons/Icon_Small_WhiteOutline_AudioOff.png")
      );
      sound.pause("menuMusic1");
      sound.muteAll();
    } else {
      this.btnSound.changeTextures(
        Texture.from("UI/Icons/Icon_Small_Blank_Audio.png"),
        Texture.from("UI/Icons/Icon_Small_WhiteOutline_Audio.png")
      );
      sound.resume("menuMusic1");
      sound.unmuteAll();
    }
  }

  private onClickPlay() {
    sound.play("pause", { singleInstance: true });
    sound.stop("menuMusic1");
    Manager.changeScene(new GameScene());
  }

  update(_deltaFrame: number, _deltaTime: number): void {
    //Hace algo?
  }
}
