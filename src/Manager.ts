import { Application, Ticker } from "pixi.js";
import { IScene } from "./Interfaces/IScene";
import { Keyboard } from "./utils/Keyboard";

export namespace Manager{

    export const WIDTH = 640;
    export const HEIGHT = 480;
    let currentScene : IScene;
    let app : Application;

    

    export function initialize(){

        if(app == undefined){
            app = new Application({
                view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
                resolution: window.devicePixelRatio || 1,
                autoDensity: true,
                backgroundColor: 0x6495ed,
                width: WIDTH,
                height: HEIGHT
            });
        }
        else throw new Error("App ya creado");


        (globalThis as any).__PIXI_APP__ = app;

        Keyboard.initialize();

        Ticker.shared.add(update)
        
            //Siempre centrado y manteniendo escala en pantalla
        addEventListener("resize",()=>{
            let scaleX = window.innerWidth /app.screen.width;
            let scaleY = window.innerHeight /app.screen.height;
            let scale = Math.min(scaleX,scaleY);

            let gameWidth = Math.round(scale * app.screen.width);
            let gameHeight = Math.round(scale * app.screen.height);

            app.view.style!.width= gameWidth + "px";
            app.view.style!.height= gameHeight + "px";

            let marginHorizontal = Math.floor((window.innerWidth - gameWidth)/2);  
            let marginVertical = Math.floor((window.innerHeight-gameHeight)/2);

            (app.view as HTMLCanvasElement).style.marginLeft= marginHorizontal+"px";
            (app.view as HTMLCanvasElement).style.marginTop= marginVertical+"px";
        });
        dispatchEvent(new Event("resize"));

    }
    
    export function changeScene(newScene : IScene){
        currentScene?.destroy();

        currentScene=newScene;
        app.stage.addChild(currentScene);
    }

    function update(deltaFrame : number){
        currentScene.update(deltaFrame,Ticker.shared.deltaMS);
    }    
}