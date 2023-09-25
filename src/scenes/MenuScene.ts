import { Container, NineSlicePlane, Texture } from "pixi.js";
import { IScene } from "../Interfaces/IScene";

export class MenuScene extends Container implements IScene{

    private background : NineSlicePlane
    constructor(){
        super();

        this.background = new NineSlicePlane(Texture.from("bgBlue"),10,10,10,10);
        this.background.scale.set(3)

        this.addChild(this.background);

    }
    update(_deltaFrame: number, _deltaTime: number): void {
        //Hace algo?
    }
}