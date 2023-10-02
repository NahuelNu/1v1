import { Container, Texture, Text } from "pixi.js";
import { IScene } from "../Interfaces/IScene";
import { Platform } from "../game/Platform";
import { Manager } from "../Manager";
import { Player2 } from "../game/Player2";
import { Player1 } from "../game/Player1";
import { checkCollision } from "../Interfaces/IHitBox";
import { Objective } from "../game/Objetive";
import { Button } from "../ui/Button";
import { PauseScene } from "./PauseScene";


export class GameScene extends Container implements IScene{

    private player1!: Player1;
    private player2! : Player2;
    private floor! : Platform;
    private pause: Boolean;
    private objective!: Objective;
    private btnPause!: Button;
    private scenePause: PauseScene;
    private platforms : Platform[];

    private score1 = new Text(0);
    private score2 = new Text(0);
    
    constructor(){
        super();

        this.crearPiso();
        this.crearPlayers();
        this.crearObjective();
        this.crearScores();
        this.crearBtnPause();
        
        this.platforms= [];
        this.crearPlatform();


        this.scenePause = new PauseScene();
        this.pause = false;
    }

    private crearPlatform() {
        for (let index = 1; index < 5; index++) {
            let platform = new Platform(Texture.from('plat1'),Texture.from('plat2'),Texture.from('plat3'),Math.random()*(Manager.WIDTH-18*3)+18*3)
            platform.position.set(Math.random()*(Manager.WIDTH-platform.width),Manager.HEIGHT*index/5);
            this.addChild(platform);
            this.platforms.push(platform);
        }
        
    }

    private crearBtnPause() {
        this.btnPause = new Button(Texture.from('pause'),Texture.from('pauseDown'),this.onClickPause.bind(this));
        this.btnPause.scale.set(0.2);
        this.btnPause.position.set(Manager.WIDTH-this.btnPause.width-10,10);
        this.addChild(this.btnPause);
    }
    private crearScores() {
        this.score1.position.set(0,0);
        this.score2.position.set(0,this.score1.height)
        this.addChild(this.score1);
        this.addChild(this.score2);
    }
    private crearObjective() {
        const texturesObjective=[Texture.from('coin1'),Texture.from('coin1.1')];
        this.objective= new Objective(texturesObjective);
        this.objective.position.set(Manager.WIDTH/2,Manager.HEIGHT/2);
        this.addChild(this.objective);
    }
    private crearPlayers() {
        const texturesPlayer1= [Texture.from('alien1'),Texture.from('alien1.1')]
        const texturesPlayer2=[Texture.from('alien2'),Texture.from('alien2.1')]
        this.player1= new Player1(texturesPlayer1);
        this.player2= new Player2(texturesPlayer2);
        this.player1.position.set(0,Manager.HEIGHT-this.floor.height-this.player1.height);
        this.player2.position.set(Manager.WIDTH-this.player2.width,Manager.HEIGHT-this.floor.height-this.player2.height);
        this.addChild(this.player1);
        this.addChild(this.player2);
    }
    private crearPiso(){
        this.floor=new Platform(Texture.from('plat2'),Texture.from('plat2'),Texture.from('plat2'),Manager.WIDTH);
        this.floor.position.set(0,Manager.HEIGHT-this.floor.height);
        this.addChild(this.floor);
    }
    
    update(deltaFrame: number, deltaTime: number): void {
        if(!this.pause){
            this.player1.update(deltaTime,deltaFrame);
            this.player2.update(deltaTime,deltaFrame);

            //Optimizar todo este código con bucles quizás 
            this.limitScreen();


            let overlap=checkCollision(this.player1,this.floor);
            if(overlap!=null){
                this.player1.separate(overlap,this.floor);
            }
            overlap=checkCollision(this.player2,this.floor);
            if(overlap!=null){
                this.player2.separate(overlap,this.floor);
            }
            overlap=checkCollision(this.player1,this.player2);
            if(overlap!=null){
                this.player1.separatePlayer(this.player2,overlap);
                this.player2.separatePlayer(this.player1,overlap);
            }

            //Chequear colision con plataformas
            this.checkCollisionWithPlatforms();
            
            // Chequear colision con el objetivo
            overlap=checkCollision(this.player1,this.objective);
            if(overlap!=null){
                this.cambiarObjetivo();
                this.sumarPunto(this.score1);
            }
            else{
                overlap=checkCollision(this.player2,this.objective);
                if(overlap!=null){
                    this.cambiarObjetivo();
                    this.sumarPunto(this.score2);
                }
            }
        }
    }
    private checkCollisionWithPlatforms() {
        let overlap;
        this.platforms.forEach( e => {
            overlap=checkCollision(this.player1,e);
            if(overlap!=null){
                this.player1.separate(overlap,e);
            }
            overlap = checkCollision(this.player2,e);
            if(overlap!=null){
                this.player2.separate(overlap,e);
            }
        });
    }

    private cambiarObjetivo(){
        this.objective.position.set(Math.random()*(Manager.WIDTH-this.objective.width),Manager.HEIGHT/2);
    }
    private sumarPunto(score : Text) {
        score.text=Number(score.text)+1;
    }

    private onClickPause(){
        this.pause=true;
        this.scenePause = new PauseScene();
        this.scenePause.position.set((Manager.WIDTH-this.scenePause.width)/2,(Manager.HEIGHT-this.scenePause.height)/2)
        this.addChild(this.scenePause);
    }

    private limitScreen(){
        if(this.player1.x<0)
            this.player1.x=0;
        else if(this.player1.x>Manager.WIDTH-this.player1.width)
            this.player1.x=Manager.WIDTH-this.player1.width;

        if(this.player2.x<0)
            this.player2.x=0;
        else if(this.player2.x>Manager.WIDTH-this.player2.width)
            this.player2.x=Manager.WIDTH-this.player2.width;
    }
}