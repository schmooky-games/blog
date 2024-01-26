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
import { ExtendedSpine } from "./extendedSpine.pixi";
import { Graphics } from "@pixi/react";
//@ts-ignore
window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
  //@ts-ignore
  window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });

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

export type Newable<T> = { new (...args: any[]): T };

interface IStageProps {
  previewElementClass: Newable<ExtendedSpine>;
  assetPromisesFactory: () => Promise<void>[];
}

const debugElements: Record<string, PIXI.DisplayObject> = {
  back: new PIXI.Text("Back", {
    fontFamily: "Arial",
    fontSize: 250,
    fill: 0xff1010,
    align: "center",
  }),
  stickyFrame: new PIXI.Graphics(),
} as const;

export const Stage: React.FC<IStageProps> = (props) => {
  // if(typeof global.undefined === undefined) return null
  console.log("Canvas updated");
  const canvasRef = React.useRef();

  const [currentAnimation, setCurrentAnimation] = React.useState<IAnimation>();
  const [spineObj, setSpineObj] = React.useState<ExtendedSpine>();
  const [zoom, setZoom] = React.useState<number>(1);

  React.useEffect(() => {
    console.log("Canvas mounted", props);
    const app = new ExtendedApp({
      backgroundColor: 0x140f24, // нужно - совпадает с фоном элемента
      resolution: 1, // нужно
      view: canvasRef.current,
      width: 400,
      height: 300,
      sharedTicker: true,
      zoom: 1,
    });
    //@ts-ignore
    globalThis.__PIXI_APP__ = app;
    loadAssets(props.assetPromisesFactory()).then(() => {
      console.log(PIXI.Assets);
      const spine = new props.previewElementClass();
      setSpineObj(spine);
      app.stage.interactive = true;
      //spine.removeFromSlot("stickyFrame");
      app.stage.addChild(spine);
      Object.keys(debugElements).forEach((key) => {
        if (debugElements[key] && debugElements[key] !== undefined) {
          spine.appendToSlot("back", debugElements[key]!);
        }
      });
      spine.skeleton.setSkinByName("low1");
      spine.getBoneContainer("symbolHolder").visible = true;
      console.log(spine.getBoneContainer("symbol"));
      // spine.state.addAnimation(0, "enable", false);
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
  }, [canvasRef.current, props.previewElementClass]);

  return (
    <StageWrapper>
      <StageText>Spine</StageText>
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
