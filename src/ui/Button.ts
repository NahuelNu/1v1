import { Container, Sprite, Texture } from "pixi.js";

export class Button extends Container {
  private def: Texture;
  private down: Texture;
  private callback: Function;
  private spr: Sprite;

  constructor(def: Texture, down: Texture, callback: Function) {
    super();
    this.def = def;
    this.down = down;
    this.callback = callback;

    this.spr = Sprite.from(def);
    this.addChild(this.spr);

    this.spr.eventMode = "static";

    this.spr.on("mousedown", this.onMouseDown, this);
    this.spr.on("mouseup", this.onMouseUp, this);
  }

  private onMouseUp() {
    this.spr.texture = this.def;
    this.callback();
  }
  private onMouseDown() {
    this.spr.texture = this.down;
  }

  public changeTextures(def: Texture, down: Texture) {
    this.def = def;
    this.down = down;
    this.spr.texture = this.def;
  }
}
