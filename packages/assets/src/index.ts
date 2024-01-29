import { ISpineMetadata } from "@pixi-spine/loader-base";

import { Assets } from "@pixi/assets";

interface ISpineKeys {
  spineName: string;
  path: string;
  skeletonName: string;
  atlasName: string;
}
interface IAtlasKeys {
  atlas: string;
  gamePath: string;
}

export interface IAssetsKeys {
  fonts: Array<string>;
  gamePath: string;
  prefix: string;
  bitMapFonts: Array<string>;
  spines: Array<ISpineKeys>;
  atlases: Array<IAtlasKeys>;
}

const HOST_PATH = "https://assets.schmooky.dev/";

export const loadAtlas = (
  atlasName: string,
  gamePath: string
): Promise<void> => {
  Assets.add(atlasName, `/${HOST_PATH + gamePath}/${atlasName}.json`);
  return Assets.load(atlasName);
};

export const loadSpineAsset = async (
  spineName: string,
  path: string,
  skeletonName: string,
  atlasName: string,
  gamePath: string
): Promise<void> => {
  const skeletonPath = `${HOST_PATH + gamePath}/spine/${path}/${skeletonName}.json`;
  try {
    const spineMetadata: ISpineMetadata = {
      spineAtlasFile: `${HOST_PATH + gamePath}/spine/${path}/${atlasName}.atlas`,
    };

    const skeleton = await Assets.load<void>({
      src: skeletonPath,
      data: spineMetadata,
    });

    const skeletonJsonData = Assets.cache.get<any>(skeletonPath);
    const skeletonData = skeletonJsonData.spineData;
    Assets.cache.set(spineName, skeletonData);
    Assets.unload(skeletonPath);

    return skeleton;
  } catch {
    throw new Error(`Faild to load spine ${spineName} from ${skeletonPath}`);
  }
};

export const generateAssetPromises = (
  assetsKeys: IAssetsKeys
): Array<Promise<void>> => {
  const promisesAssets: Array<Promise<void>> = [];
  if (assetsKeys.bitMapFonts.length) {
    assetsKeys.bitMapFonts.forEach((bitMapFont) => {
      promisesAssets.push(Assets.load(`fonts/${bitMapFont}.fnt`));
    });
  }
  if (assetsKeys.spines.length) {
    assetsKeys.spines.forEach(
      ({ spineName, path, skeletonName, atlasName }) => {
        promisesAssets.push(
          loadSpineAsset(
            assetsKeys.prefix + spineName,
            path,
            skeletonName,
            atlasName,
            assetsKeys.gamePath
          )
        );
      }
    );
  }
  if (assetsKeys.atlases.length) {
    assetsKeys.atlases.forEach(({ atlas, gamePath }) => {
      promisesAssets.push(loadAtlas(atlas, gamePath));
    });
  }
  return promisesAssets;
};

export const loadAssets = (
  assetPromises: Array<Promise<unknown>>,
  updateProgress?: (progress: number) => void
): Promise<unknown[]> => {
  if (updateProgress) {
    let loadedAssetsCount = 0;
    const allAssetsCount = assetPromises.length;
    assetPromises.forEach((promise) => {
      promise.then(() => {
        loadedAssetsCount++;
        updateProgress(loadedAssetsCount / allAssetsCount);
      });
    });
  }
  return Promise.all(assetPromises);
};

export interface IAssetsKeys {
  fonts: Array<string>;
  gamePath: string;
  prefix: string;
  bitMapFonts: Array<string>;
  spines: Array<ISpineKeys>;
  atlases: Array<IAtlasKeys>;
}
