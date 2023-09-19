import { Application} from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});

(globalThis as any).__PIXI_APP__ = app;

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