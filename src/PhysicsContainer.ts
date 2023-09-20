import { Container, Point } from "pixi.js";
import { IScene } from "./Interfaces/IScene";

export class PhysicsContainer extends Container implements IScene{
    protected speed = new Point();
    protected accelerate = new Point();

    constructor(speedX?:number, speedY?: number, accelerateX?:number, accelerateY?:number){
        super();
        this.speed.set(speedX,speedY);
        this.accelerate.set(accelerateX,accelerateY);
    }

    public set speedY(speedY:number){
        this.speed.y=speedY;
    }
    public set accelerateY(accelerateY: number) {
        this.accelerate.y=accelerateY;
    }

    public update(deltaSeconds:number,_deltaFrame:number): void {
        
        // Actualizar pos & speed
        this.x += this.speed.x*deltaSeconds + 1/2 * this.accelerate.x*Math.pow(deltaSeconds,2); 
        this.y += this.speed.y*deltaSeconds;
        this.speed.x+=this.accelerate.x*deltaSeconds;
        this.speed.y += this.accelerate.y*deltaSeconds;
    }
}