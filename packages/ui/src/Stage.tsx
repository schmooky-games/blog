"use client";
import * as React from "react";
import * as PIXI from "pixi.js";
import { loadAssets, generateAssetPromises, IAssetsKeys } from "./load";
import { IAnimation, Spine } from "pixi-spine";
import {
  StageWrapper,
  StageInner,
  StageText,
  AnimationsCase,
  AnimationCase,
  ZoomCase,
} from "./CuteStage";

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
  get animationNames(): string[] {
    return this.spineData.animations.map((foo) => foo.name);
  }
}

interface IExtendedAppOptions extends PIXI.IApplicationOptions {
  zoom: number;
}

class ExtendedApp extends PIXI.Application {
  set zoom(value: number) {
    this.stage.scale.set(1 / Math.min(10, Math.max(0.1, +value.toFixed(2))));
  }
  get zoom(): number {
    return 1 / this.stage.scale.x;
  }
  constructor(options?: Partial<IExtendedAppOptions>) {
    super(options);
    this.stage.x = this.renderer.view.width / 2;
    this.stage.y = this.renderer.view.height / 2;
  }
}

const promises: Array<Promise<void>> = generateAssetPromises(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  MoonLightBurstKeyLoaders
);

export const Stage = () => {
  // if(typeof global.undefined === undefined) return null
  console.log("Canvas updated");
  const canvasRef = React.useRef();
  const [currentAnimation, setCurrentAnimation] = React.useState<IAnimation>();
  const [spineObj, setSpineObj] = React.useState<UploadSpine>();
  const [zoom, setZoom] = React.useState<number>(1);
  React.useEffect(() => {
    console.log("Canvas mounted");
    const app = new ExtendedApp({
      backgroundColor: 0x140f24, // нужно - совпадает с фоном элемента
      resolution: 1, // нужно
      view: canvasRef.current,
      width: 400,
      height: 300,
      sharedTicker: true,
      zoom: 1,
    });
    loadAssets(promises).then(() => {
      console.log(PIXI.Assets);
      const spine = new UploadSpine("winspinity-moonlight-burst-seven");
      setSpineObj(spine);
      app.stage.interactive = true;
      app.stage.addChild(spine);
      //@ts-ignore
      app.view.addEventListener(
        "wheel",
        (e: WheelEvent) => {
          e.preventDefault();
          app.zoom = app.zoom - 0.1 * Math.sign(e.deltaY * -1);
          setZoom(app.zoom);
        },
        { passive: false }
      );
      spine.state.addListener({
        start(entry) {
          console.log("Anim started");
          //@ts-ignore
          setCurrentAnimation(entry.animation);
        },
        interrupt(entry) {},
        end(entry) {},
        dispose(entry) {},
        complete(entry) {
          console.log("Anim Ended");
          setCurrentAnimation(undefined);
        },
        event(entry, event) {},
      });
    });
  }, [canvasRef.current]);

  return (
    <StageWrapper>
      <StageText>Seven</StageText>
      <StageInner>
        <ZoomCase>Scale: {Math.round(zoom * 10) / 10}</ZoomCase>
        {/*@ts-ignore */}
        <canvas ref={canvasRef}></canvas>
        <AnimationsCase>
          {spineObj &&
            spineObj.animationNames.map((foo, i) => (
              <AnimationCase
                onClick={() => spineObj.state.setAnimation(0, foo, false)}
                key={i}
                animPlayed={currentAnimation && currentAnimation.name == foo}
              >
                {foo}
              </AnimationCase>
            ))}
        </AnimationsCase>
      </StageInner>
    </StageWrapper>
  );
};
