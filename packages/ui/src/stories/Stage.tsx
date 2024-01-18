import * as React from "react";
import * as PIXI from "pixi.js";
import { loadAssets, generateAssetPromises, IAssetsKeys } from "../load";
import { Spine } from "pixi-spine";

export const initialAssetsLoaderKeys: IAssetsKeys = {
  fonts: [],
  bitMapFonts: [],
  spines: [
    {
      spineName: "seven",
      path: "seven",
      skeletonName: "seven",
      atlasName: "seven",
    },
  ],
  atlases: [],
};

const promises: Array<Promise<void>> = generateAssetPromises(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  initialAssetsLoaderKeys
);

export const Stage = () => {
  console.log("Canvas updated");
  const canvasRef = React.useRef();
  React.useEffect(() => {
    console.log("Canvas mounted");
    const app = new PIXI.Application({
      backgroundColor: 0x140f24, // нужно - совпадает с фоном элемента
      resolution: 1, // нужно
      view: canvasRef.current,
      width: 400,
      height: 300,
      sharedTicker: true,
    });
    loadAssets(promises).then(() => {
      console.log(PIXI.Assets.cache);
      const spine = new Spine(PIXI.Assets.cache.get("seven"));
      spine.x = 200;
      spine.y = 150;
      app.stage.addChild(spine);
      spine.state.setAnimation(0, "action", true);
    });
  }, [canvasRef.current]);
  return (
    <div>
      <canvas ref={canvasRef} style={{ borderRadius: 16 }}></canvas>
    </div>
  );
};
