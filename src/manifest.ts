import { AssetsManifest } from "pixi.js";

export const manifest: AssetsManifest = {
  bundles: [
    {
      name: "fonts",
      assets: {
        fontRubikBold: "./Rubik-Bold.ttf",
      },
    },
    {
      name: "sounds",
      assets: {
        menuMusic1: "./sounds/menu.mp3",
        menuMusic2: "./sounds/menu2.mp3",
        gameMusic1: "./sounds/game.mp3",
        gameMusic2: "./sounds/game2.mp3",
        pause: "./sounds/pause.mp3",
        obj: "./sounds/obj.mp3",
        jump: "./sounds/jump.mp3",
      },
    },
    {
      name: "spritesheet",
      assets: {
        spritesheet: "./spritesheet/texture.json",
      },
    },
  ],
};
