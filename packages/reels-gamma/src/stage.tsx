"use client";
import * as React from "react";
import * as PIXI from "pixi.js";
import { loadAssets } from "@repo/assets";
import {
  StageWrapper,
  StageInner,
  StageText,
  ZoomCase,
  StagePanel,
  StageOuter,
} from "./styles";
import { AppContext, ExtendedApp } from "./app";
import { addBrowserExtensionDebug } from "./debug";
import { observer } from "mobx-react";
import { ReelsBase } from "./reels";

//@ts-ignore
window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
  //@ts-ignore
  window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });

export interface IStageDisplayable {}

export interface IStageProps {
  assetPromisesFactory: () => Promise<void>[];
  onLoad: (app: ExtendedApp, stage: PIXI.Container) => Promise<void>;
}

export const Stage: React.FC<IStageProps> = (props) => {
  const [canvasRef, setCanvasRef] = React.useState<HTMLCanvasElement | null>(
    null
  );
  const [zoom, setZoom] = React.useState<number>(1);
  const [ready, setReady] = React.useState(false);
  const [app, setApp] = React.useState<ExtendedApp>();

  React.useEffect(() => {
    if (!canvasRef) return;

    const _app = new ExtendedApp({
      backgroundColor: 0x140f24, // нужно - совпадает с фоном элемента
      resolution: 1, // нужно
      view: canvasRef,
      width: 800,
      height: 600,
      sharedTicker: true,
      zoom: 2,
    });

    setApp(_app);

    addBrowserExtensionDebug(_app);
    const assetPromises = loadAssets(props.assetPromisesFactory())
    console.log(assetPromises)
    Promise.allSettled(assetPromises).then(() => {
      console.log('Assets Loaded', PIXI.Assets.cache)
      _app.stage.interactive = true;
      //@ts-ignore
      _app.view.addEventListener(
        "wheel",
        (e: WheelEvent) => {
          e.preventDefault();
          _app.zoom = _app.zoom - 0.1 * Math.sign(e.deltaY * -1);
          setZoom(_app.zoom);
        },
        { passive: false }
      );

      const reels =  new ReelsBase();
      _app.stage.addChild(reels)

      const [rw,rh] = reels.outerBounds
      _app.stage.x -= rw/4;
      _app.stage.y -= rh/4;

      props.onLoad(_app, _app.stage).then(() => setReady(true));
    });
  }, [canvasRef]);
  return (
          <canvas
            ref={(ref) => {
              setCanvasRef(ref);
            }}
            style={{ opacity: ready ? "100%" : "0%" }}
          ></canvas>

  );
};
