import { Graphics, Rectangle, Sprite, Texture } from "pixi.js";
import { PhysicsContainer } from "../PhysicsContainer";
import { IHitBox } from "../Interfaces/IHitBox";


export class Platform extends PhysicsContainer implements IHitBox{

   
    private hitbox : Graphics;

    constructor(texture:Texture, width : number){
        super();
        
        while(this.width<width){
            let platformSprite = Sprite.from(texture);
            platformSprite.position.x=this.width;
            this.addChild(platformSprite);
        }
        this.hitbox=new Graphics();
        this.hitbox.beginFill(0xFFFF00,0.4);
        this.hitbox.drawRect(0,0,this.width,this.height);
        this.hitbox.endFill();
        this.hitbox.visible=false;
        this.addChild(this.hitbox);
        
    }
    getHitBox(): Rectangle {
        return this.hitbox.getBounds();
    }
    
}