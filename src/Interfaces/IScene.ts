import { DisplayObject } from "pixi.js";

export interface IScene extends DisplayObject {
    update(deltaFrame:number,deltaTime:number): void;
}