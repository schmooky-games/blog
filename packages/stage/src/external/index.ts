import { IAssetsKeys } from "@repo/assets";
import * as PIXI from "pixi.js";

export const MoonLightBurstKeyLoaders: IAssetsKeys = {
    fonts: [],
    gamePath: "thunderkick/grand-melee",
    prefix: "thunderkick-grand-melee-",
    bitMapFonts: [],
    spines: [
      {
        spineName: "high",
        path: "symbols",
        skeletonName: "high",
        atlasName: "symbols",
      },
      {
        spineName: "symbolEffects",
        path: "symbols",
        skeletonName: "symbolEffects",
        atlasName: "symbols",
      },
      {
        spineName: "lows",
        path: "symbols",
        skeletonName: "lows",
        atlasName: "symbols",
      },
    ],
    atlases: [],
  };

  
const debugElements: Record<string, PIXI.DisplayObject> = {
    back: new PIXI.Text("Back", {
      fontFamily: "Arial",
      fontSize: 250,
      fill: 0xff1010,
      align: "center",
    }),
    stickyFrame: new PIXI.Graphics(),
  } as const;