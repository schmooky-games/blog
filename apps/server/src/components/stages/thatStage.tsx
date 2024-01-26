import { generateAssetPromises, Stage } from "@repo/ui";
import type { IAssetsKeys } from "@repo/ui";
import { ExtendedSpine } from "@repo/ui/src/extendedSpine";
import Lows from "@repo/ui/src/lows";
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
  return <Stage previewElementClass={Lows} assetPromisesFactory={factory} />;
};
