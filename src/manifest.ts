import { AssetsManifest } from "pixi.js";

export const manifest: AssetsManifest = {
    bundles: [
        {
            name : 'cars',
            assets:{
                "blackCar":"./kenney_racing-pack/PNG/Cars/car_black_5.png",
            }
        },
        {
            name: "UI",
            assets:{
                'bgBlue':"./kenney_UI-pack/PNG/blue_panel.png",
                'pause' : './UI/Icons/Icon_Small_Blank_Pause.png', 
                'pauseDown' : './UI/Icons/Icon_Small_WhiteOutline_Pause.png', 
            }
        },
        {
            name: 'platforms',
            assets:{
                'plat1' : './kenney_pixel-platformer/Tiles/tile_0000.png',
                'plat2' : './kenney_pixel-platformer/Tiles/tile_0001.png',
                'plat3' : './kenney_pixel-platformer/Tiles/tile_0002.png',
            }
        },
        {
            name : 'player',
            assets:{
                'alien1' :'./kenney_pixel-platformer/Characters/character_0000.png',
                'alien1.1' :'./kenney_pixel-platformer/Characters/character_0001.png',
                'alien2' : './kenney_pixel-platformer/Characters/character_0005.png',
                'alien2.1' :'./kenney_pixel-platformer/Characters/character_0004.png',
            }
        },
        {
            name: 'world',
            assets:{
                'coin1' : 'kenney_pixel-platformer/Tiles/tile_0151.png',
                'coin1.1' : 'kenney_pixel-platformer/Tiles/tile_0152.png',
            }
        },
    ]
}
