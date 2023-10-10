import { Container, Texture, Text, Sprite, TextStyle } from "pixi.js";
import { IScene } from "../Interfaces/IScene";
import { Platform } from "../game/Platform";
import { Manager } from "../Manager";
import { Player2 } from "../game/Player2";
import { Player1 } from "../game/Player1";
import { checkCollision } from "../Interfaces/IHitBox";
import { Objective } from "../game/Objetive";
import { Button } from "../ui/Button";
import { PauseScene } from "./PauseScene";
import { sound } from "@pixi/sound";
import { WinScene } from "./WinScene";

export class GameScene extends Container implements IScene {
  private player1!: Player1;
  private player2!: Player2;
  private floor!: Platform;
  private pause: Boolean;
  private objective!: Objective;
  private btnPause!: Button;
  private scenePause: PauseScene;
  private platforms: Platform[];
  private background!: Sprite;

  private score1 = new Text(0);
  private score2 = new Text(0);
  private scoreObjetivo = 15;

  constructor() {
    super();
    this.crearFondo();

    this.crearPiso();
    this.crearPlayers();
    this.crearObjective();
    this.crearScores();
    this.crearBtnPause();

    this.platforms = [];
    this.crearPlatform();

    this.scenePause = new PauseScene();
    this.pause = false;

    sound.play("gameMusic1", { singleInstance: true, volume: 0.2, loop: true });
  }
  private crearFondo() {
    let fondos = [
      "Backgrounds/dawnbackground.png",
      "Backgrounds/fajrbackground.png",
      "Backgrounds/noonbackground.png",
      "Backgrounds/sunsetbackground.png",
    ];
    let fondo = fondos[Math.floor(Math.random() * 4)];
    this.background = Sprite.from(fondo);
    this.background.alpha = 0.7;
    this.addChild(this.background);
  }

  private crearPlatform() {
    for (let index = 1; index < 5; index++) {
      let tamanio;
      do {
        tamanio = Math.random() * (Manager.WIDTH - 18 * 3) + 18 * 3;
      } while (tamanio >= Manager.WIDTH - 60);

      let platform = new Platform(
        Texture.from("kenney_pixel-platformer/Tiles/tile_0001.png"),
        Texture.from("kenney_pixel-platformer/Tiles/tile_0002.png"),
        Texture.from("kenney_pixel-platformer/Tiles/tile_0003.png"),
        tamanio
      );

      let posX;
      do {
        posX = Math.random() * (Manager.WIDTH - platform.width);
      } while (posX < 30 || posX + platform.width > Manager.WIDTH - 30);
      platform.position.set(posX, (Manager.HEIGHT * index) / 5);
      this.addChild(platform);
      this.platforms.push(platform);
    }
  }

  private crearBtnPause() {
    this.btnPause = new Button(
      Texture.from("UI/Icons/Icon_Small_Blank_Pause.png"),
      Texture.from("UI/Icons/Icon_Small_WhiteOutline_Pause.png"),
      this.onClickPause.bind(this)
    );
    this.btnPause.scale.set(0.2);
    this.btnPause.position.set(Manager.WIDTH - this.btnPause.width - 10, 10);
    this.addChild(this.btnPause);
  }
  private crearScores() {
    this.score1.position.set(5, 0);
    this.score2.position.set(5, this.score1.height);
    let textStyle = new TextStyle({
      fontFamily: "fontRubikBold",
      fontWeight: "bold",
      fill: "black",
    });
    this.score1.style = textStyle;
    this.score2.style = textStyle;
    this.addChild(this.score1);
    this.addChild(this.score2);
  }
  private crearObjective() {
    const texturesObjective = [
      Texture.from("kenney_pixel-platformer/Tiles/tile_0151.png"),
      Texture.from("kenney_pixel-platformer/Tiles/tile_0152.png"),
    ];
    this.objective = new Objective(texturesObjective);
    this.objective.position.set(Manager.WIDTH / 2, Manager.HEIGHT / 2);
    this.addChild(this.objective);
  }
  private crearPlayers() {
    const texturesPlayer1 = [
      Texture.from("kenney_pixel-platformer/Characters/character_0000.png"),
      Texture.from("kenney_pixel-platformer/Characters/character_0001.png"),
    ];
    const texturesPlayer2 = [
      Texture.from("kenney_pixel-platformer/Characters/character_0005.png"),
      Texture.from("kenney_pixel-platformer/Characters/character_0004.png"),
    ];
    this.player1 = new Player1(texturesPlayer1);
    this.player2 = new Player2(texturesPlayer2);

    this.player1.scale.set(1.2);
    this.player2.scale.set(1.2);

    this.player1.position.set(
      0,
      Manager.HEIGHT - this.floor.height - this.player1.height
    );
    this.player2.position.set(
      Manager.WIDTH - this.player2.width,
      Manager.HEIGHT - this.floor.height - this.player2.height
    );
    this.addChild(this.player1);
    this.addChild(this.player2);
  }
  private crearPiso() {
    this.floor = new Platform(
      Texture.from("kenney_pixel-platformer/Tiles/tile_0002.png"),
      Texture.from("kenney_pixel-platformer/Tiles/tile_0002.png"),
      Texture.from("kenney_pixel-platformer/Tiles/tile_0002.png"),
      Manager.WIDTH
    );
    this.floor.position.set(0, Manager.HEIGHT - this.floor.height);
    this.addChild(this.floor);
  }

  update(deltaFrame: number, deltaTime: number): void {
    if (!this.pause) {
      this.player1.update(deltaTime, deltaFrame);
      this.player2.update(deltaTime, deltaFrame);
      this.objective.play();

      //Optimizar todo este código con bucles quizás
      this.limitScreen();

      let overlap = checkCollision(this.player1, this.floor);
      if (overlap != null) {
        this.player1.separate(overlap, this.floor);
      }
      overlap = checkCollision(this.player2, this.floor);
      if (overlap != null) {
        this.player2.separate(overlap, this.floor);
      }
      overlap = checkCollision(this.player1, this.player2);
      if (overlap != null) {
        this.player1.separatePlayer(this.player2, overlap);
        this.player2.separatePlayer(this.player1, overlap);
      }

      //Chequear colision con plataformas
      this.checkCollisionWithPlatforms();

      // Chequear colision con el objetivo
      overlap = checkCollision(this.player1, this.objective);
      if (overlap != null) {
        this.cambiarObjetivo();
        this.sumarPunto(this.score1);
      } else {
        overlap = checkCollision(this.player2, this.objective);
        if (overlap != null) {
          this.cambiarObjetivo();
          this.sumarPunto(this.score2);
        }
      }

      if (Number(this.score1.text) >= this.scoreObjetivo) {
        this.showWinner(1);
      } else if (Number(this.score2.text) >= this.scoreObjetivo) {
        this.showWinner(2);
      }
    }
  }
  private showWinner(winner: number) {
    sound.stop("gameMusic1");
    Manager.changeScene(new WinScene(winner, this.background));
  }

  private checkCollisionWithPlatforms() {
    let overlap;
    this.platforms.forEach((e) => {
      overlap = checkCollision(this.player1, e);
      if (overlap != null) {
        this.player1.separate(overlap, e);
      }
      overlap = checkCollision(this.player2, e);
      if (overlap != null) {
        this.player2.separate(overlap, e);
      }
    });
  }

  private cambiarObjetivo() {
    sound.play("obj", { volume: 2, singleInstance: true });
    this.objective.position.set(
      Math.random() * (Manager.WIDTH - this.objective.width),
      (Manager.HEIGHT / 5) * Math.round(Math.random() * (4 - 1 + 1)) +
        Manager.HEIGHT / 10
    );
  }

  private sumarPunto(score: Text) {
    score.text = Number(score.text) + 1;
  }

  private onClickPause() {
    this.pause = true;
    this.objective.stop();
    this.btnPause.eventMode = "none";
    sound.pauseAll();

    this.scenePause = new PauseScene();
    this.scenePause.position.set(
      (Manager.WIDTH - this.scenePause.width) / 2,
      (Manager.HEIGHT - this.scenePause.height) / 2
    );
    this.addChild(this.scenePause);
  }

  public resume() {
    this.pause = false;
    this.objective.play();
    this.scenePause.destroy();
    this.btnPause.eventMode = "static";
    sound.resumeAll();
  }

  private limitScreen() {
    if (this.player1.x < 0) this.player1.x = 0;
    else if (this.player1.x > Manager.WIDTH - this.player1.width)
      this.player1.x = Manager.WIDTH - this.player1.width;
    if (this.player1.y < 0) {
      this.player1.y = 0;
      this.player1.speedY = 0;
    }

    if (this.player2.x < 0) this.player2.x = 0;
    else if (this.player2.x > Manager.WIDTH - this.player2.width)
      this.player2.x = Manager.WIDTH - this.player2.width;
    if (this.player2.y < 0) {
      this.player2.y = 0;
      this.player2.speedY = 0;
    }
  }
}
