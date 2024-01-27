import { IAssetsKeys } from "@repo/assets";
import { generateAssetPromises } from "@repo/assets";

export const grandMeleeKeyLoaders: IAssetsKeys = {
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

export const grandMeleeFactory = () =>
  generateAssetPromises(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    grandMeleeKeyLoaders
  );
