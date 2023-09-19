import { Application, DisplayObject } from "pixi.js";

export class Manager{
    private constructor(){}

    private static app: Application;
    private static currentScene: IScene;

    private static _width: number;
    private static _height: number;

    public static get width(): number {
        return Manager._width;
    }
    public static get height(): number {
        return Manager._height;
    }
}

export interface IScene extends DisplayObject {
    update(framesPassed: number): void;
}