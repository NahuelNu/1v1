import { Assets, Container, Graphics } from "pixi.js";
import { Manager } from "../Manager";
import { manifest } from "../manifest";
import { IScene } from "../Interfaces/IScene";

export class LoaderScene extends Container implements IScene{
    private loaderBar: Container;
    private loaderBarBoder: Graphics;
    private loaderBarFill: Graphics;
    constructor() {
        super();

        const loaderBarWidth = Manager.WIDTH * 0.8;

        this.loaderBarFill = new Graphics();
        this.loaderBarFill.beginFill(0xFF0000, 1)
        this.loaderBarFill.drawRect(0, 0, loaderBarWidth, 50);
        this.loaderBarFill.endFill();
        this.loaderBarFill.scale.x = 0;

        this.loaderBarBoder = new Graphics();
        this.loaderBarBoder.lineStyle(10, 0x0, 1);
        this.loaderBarBoder.drawRect(0, 0, loaderBarWidth, 50);

        this.loaderBar = new Container();
        this.loaderBar.addChild(this.loaderBarFill);
        this.loaderBar.addChild(this.loaderBarBoder);
        this.loaderBar.position.x = (Manager.WIDTH - this.loaderBar.width) / 2;
        this.loaderBar.position.y = (Manager.HEIGHT - this.loaderBar.height) / 2;
        this.addChild(this.loaderBar);

        this.initializeLoader().then(() => {
            this.gameLoaded();
        })
    }

    //HACER ALGO??
    update(_deltaFrame: number, _deltaTime: number): void {
    }
    
    

    private async initializeLoader(): Promise<void>{
        await Assets.init({ manifest: manifest });
        const bundleIds =  manifest.bundles.map(bundle => bundle.name);
        await Assets.loadBundle(bundleIds, this.downloadProgress.bind(this));
    }

    private downloadProgress(progressRatio: number): void {
        this.loaderBarFill.scale.x = progressRatio;
    }

    private gameLoaded(): void {
        // Change scene to the game scene!
        // Manager.changeScene(new GameScene());
    }

}