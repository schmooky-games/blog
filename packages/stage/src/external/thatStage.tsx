import { IAssetsKeys, generateAssetPromises } from "@repo/assets";
import { Spine } from "@repo/spine";
import { Stage } from "../stage";

export default class Lows extends Spine {
  constructor() {
    super("thunderkick-grand-melee-lows");
  }
}


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

const factory = () =>
  generateAssetPromises(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    MoonLightBurstKeyLoaders
  );

export const ThatStage = () => {
  return <Stage onLoad={async ()=>{return console.log('aaa')}} assetPromisesFactory={factory} />;
};
