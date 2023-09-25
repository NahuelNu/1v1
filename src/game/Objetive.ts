import { AnimatedSprite, Graphics, Rectangle, Texture } from "pixi.js";
import { IHitBox } from "../Interfaces/IHitBox";
import { PhysicsContainer } from "../PhysicsContainer";

export class Objective extends PhysicsContainer implements IHitBox{
    private hitbox:Graphics ;
    private animatedSprite : AnimatedSprite;

    constructor(textures : Texture[]){
        super();
        this.animatedSprite = new AnimatedSprite(
            textures,
            true
        );
        this.addChild(this.animatedSprite);
        this.animatedSprite.animationSpeed=0.1;
        this.animatedSprite.play();

        this.hitbox=new Graphics();
        this.hitbox.beginFill(0x0000FF,0.4);
        this.hitbox.drawRect(2.5,2,this.animatedSprite.width-4.5,this.animatedSprite.height-4);
        this.hitbox.endFill();
        this.hitbox.visible=false;
        this.animatedSprite.addChild(this.hitbox);
    }
    getHitBox(): Rectangle {
        return this.hitbox.getBounds();
    }

}