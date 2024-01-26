"use client";
import * as React from "react";
import * as PIXI from "pixi.js";
import { loadAssets } from "@repo/assets";
import {
  StageWrapper,
  StageInner,
  StageText,
  ZoomCase,
} from "./styles";

import { ExtendedApp } from "./app";
import { addBrowserExtensionDebug } from "./debug";

//@ts-ignore
window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
  //@ts-ignore
  window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });

export interface IStageDisplayable {

}

export interface IStageProps {
  assetPromisesFactory: () => Promise<void>[];
  onLoad: (app: ExtendedApp, stage: PIXI.Container) => Promise<void>;
}

export const Stage: React.FC<IStageProps> = (props) => {

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = React.useState<number>(1);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (!canvasRef.current) return;

    const app = new ExtendedApp({
      backgroundColor: 0x140f24, // нужно - совпадает с фоном элемента
      resolution: 1, // нужно
      view: canvasRef.current,
      width: 400,
      height: 300,
      sharedTicker: true,
      zoom: 1,
    });

    addBrowserExtensionDebug();

    loadAssets(props.assetPromisesFactory()).then(() => {
      app.stage.interactive = true;
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

      props.onLoad(app, app.stage).then(() => setReady(ready))


    });
  }, [canvasRef.current]);

  return (
    <StageWrapper>
      <StageText>Spine</StageText>
      <StageInner>
        <ZoomCase>Scale: {Math.round(zoom * 10) / 10}</ZoomCase>
        <canvas ref={canvasRef} style={{ opacity: ready ? '100%' : '0%' }}></canvas>
      </StageInner>
    </StageWrapper>
  );
};
