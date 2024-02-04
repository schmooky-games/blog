import { IAssetsKeys } from "@repo/assets";
import { generateAssetPromises } from "@repo/assets";

export const prototypeKeyLoaders: IAssetsKeys = {
  fonts: [],
  gamePath: "prototype",
  prefix: "prototype-",
  bitMapFonts: [],
  spines: [],
  atlases: [{ atlas: "prototype" }],
};

export const prototypeFactory = () =>
  generateAssetPromises(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    prototypeKeyLoaders
  );
