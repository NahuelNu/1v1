import { Container, Texture, Text } from "pixi.js";
import { IScene } from "../Interfaces/IScene";
import { Platform } from "../game/Platform";
import { Manager } from "../Manager";
import { Player2 } from "../game/Player2";
import { Player1 } from "../game/Player1";
import { checkCollision } from "../Interfaces/IHitBox";
import { Objective } from "../game/Objetive";


export class GameScene extends Container implements IScene{

    private player1 : Player1;
    private player2 : Player2;
    private floor : Platform;
    private pause: Boolean;
    private objective : Objective;
    private textWinner : Text;
    
    constructor(){
        super();

        this.floor=new Platform(Texture.from('plat3'),Manager.WIDTH);
        this.floor.position.set(0,Manager.HEIGHT-this.floor.height);
        this.addChild(this.floor);

        const texturesPlayer1= [Texture.from('alien1'),Texture.from('alien1.1')]
        const texturesPlayer2=[Texture.from('alien2'),Texture.from('alien2.1')]
        this.player1= new Player1(texturesPlayer1);
        this.player2= new Player2(texturesPlayer2);
        this.player1.position.set(0,Manager.HEIGHT-this.floor.height-this.player1.height);
        this.player2.position.set(Manager.WIDTH-this.player2.width,Manager.HEIGHT-this.floor.height-this.player2.height);
        this.addChild(this.player1);
        this.addChild(this.player2);

        const texturesObjective=[Texture.from('coin1'),Texture.from('coin1.1')];
        this.objective= new Objective(texturesObjective);
        this.objective.position.set(Manager.WIDTH/2,Manager.HEIGHT/2);
        this.addChild(this.objective);

        this.textWinner = new Text();
        this.pause = false;
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
            
            // Chequear colision con el objetivo
            overlap=checkCollision(this.player1,this.objective);
            if(overlap!=null){
                this.textWinner.text='Player 1 WINS';
                this.addChild(this.textWinner);
            }
            else{
                overlap=checkCollision(this.player2,this.objective);
                if(overlap!=null){
                    this.textWinner.text='Player 2 WINS';
                    this.addChild(this.textWinner);
                }
            }
        }
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