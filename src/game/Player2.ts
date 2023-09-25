import { IDestroyOptions, Texture } from "pixi.js";
import { Keyboard } from "../utils/Keyboard";
import { Player } from "../Player";

export class Player2 extends Player{
    constructor(textures:Texture[]){
        super(textures);

        Keyboard.down.on('ArrowUp',this.jump,this);
    }

    override destroy(options?: boolean | IDestroyOptions | undefined): void {
        super.destroy(options);
        Keyboard.down.off('ArrowUp',this.jump,this);
    }

    public override update(deltaMS: number, deltaFrame: number): void {
        this.playerAnimated.update(deltaFrame);
        super.update(deltaMS/1000,deltaFrame);
        
        if(Keyboard.state.get('ArrowRight')){
            this.speed.x=Player.MOVE_SPEED;
        } 
        else if(Keyboard.state.get('ArrowLeft')){
            this.speed.x=-Player.MOVE_SPEED;
        } else {
            this.speed.x=0;
        }
    }
}