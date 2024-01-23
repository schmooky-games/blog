import { generateAssetPromises, Stage } from "@repo/ui";
import type { IAssetsKeys } from "@repo/ui"
import { UploadSpine } from "@repo/ui/src/uploadSpine";
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

const factory = () => generateAssetPromises(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    MoonLightBurstKeyLoaders
);

class SymbolEffectsSpine extends UploadSpine {
    constructor() {
        super("thunderkick-grand-melee-symbolEffects");
    }
}

export const ThatStage = () => { return (<Stage previewElementClass={SymbolEffectsSpine} assetPromisesFactory={factory} />) }