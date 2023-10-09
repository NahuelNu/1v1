import { AssetsManifest } from "pixi.js";

export const manifest: AssetsManifest = {
  bundles: [
    {
      name: "UI",
      assets: {
        pause: "./UI/Icons/Icon_Small_Blank_Pause.png",
        pauseDown: "./UI/Icons/Icon_Small_WhiteOutline_Pause.png",
      },
    },
    {
      name: "UI-menu",
      assets: {
        play: "./Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Buttons/Rect-Medium/PlayText/Default.png",
        playDown:
          "./Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Buttons/Rect-Medium/PlayText/Hover.png",
        "1v1": "./1v1.png",
      },
    },
    {
      name: "UI-pause",
      assets: {
        menuBg:
          "./Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Panel/Window/Medium.png",
        playIcon:
          "./Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Buttons/Rect-Medium/PlayIcon/Default.png",
        playIconDown:
          "./Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Buttons/Rect-Medium/PlayIcon/Hover.png",
        home: "./Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Buttons/Square-Medium/Home/Default.png",
        repeat:
          "./Prinbles_GUI_Asset_Solid (1.0.0)/asset/png/Buttons/Square-Medium/Repeat/Default.png",
      },
    },
    {
      name: "platforms",
      assets: {
        plat1: "./kenney_pixel-platformer/Tiles/tile_0001.png",
        plat2: "./kenney_pixel-platformer/Tiles/tile_0002.png",
        plat3: "./kenney_pixel-platformer/Tiles/tile_0003.png",
      },
    },
    {
      name: "player",
      assets: {
        alien1: "./kenney_pixel-platformer/Characters/character_0000.png",
        "alien1.1": "./kenney_pixel-platformer/Characters/character_0001.png",
        alien2: "./kenney_pixel-platformer/Characters/character_0005.png",
        "alien2.1": "./kenney_pixel-platformer/Characters/character_0004.png",
      },
    },
    {
      name: "world",
      assets: {
        coin1: "kenney_pixel-platformer/Tiles/tile_0151.png",
        "coin1.1": "kenney_pixel-platformer/Tiles/tile_0152.png",
      },
    },
  ],
};
