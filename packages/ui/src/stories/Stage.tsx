import * as React from "react";
import * as PIXI from "pixi.js";
import { loadAssets, generateAssetPromises, IAssetsKeys } from "../load";
import { Spine } from "pixi-spine";
import {
  StageWrapper,
  StageInner,
  StageText,
  AnimationsCase,
  AnimationCase,
} from "../CuteStage";

export const MoonLightBurstKeyLoaders: IAssetsKeys = {
  fonts: [],
  gamePath: "winspinity/moonlight-burst",
  prefix: "winspinity-moonlight-burst-",
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

class UploadSpine extends Spine {
  constructor(spineName: string) {
    if (PIXI.Assets.cache.get(spineName))
      super(PIXI.Assets.cache.get(spineName));
    else {
      console.error("Provided name does not exist in cache");
    }
  }
}

const promises: Array<Promise<void>> = generateAssetPromises(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  MoonLightBurstKeyLoaders
);

export const Stage = () => {
  console.log("Canvas updated");
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNames] = React.useState<string[]>([]);
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
      console.log(PIXI.Assets);
      const spine = new UploadSpine("winspinity-moonlight-burst-seven");
      setAnimationNames(spine.spineData.animations.map((foo) => foo.name));
      spine.x = 200;
      spine.y = 150;
      app.stage.addChild(spine);
      spine.state.setAnimation(0, "action", true);
    });
  }, [canvasRef.current]);

  return (
    <StageWrapper>
      <StageText>Seven</StageText>
      <StageInner>
        <AnimationsCase>
          {animationNames.map((foo) => (
            <AnimationCase>{foo}</AnimationCase>
          ))}
        </AnimationsCase>
        <canvas ref={canvasRef}></canvas>
      </StageInner>
    </StageWrapper>
  );
};
