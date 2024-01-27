"use client";
import * as React from "react";
import * as PIXI from "pixi.js";
import { loadAssets } from "@repo/assets";
import { StageWrapper, StageInner, StageText, ZoomCase } from "./styles";
import { ExtendedApp } from "./app";
import { addBrowserExtensionDebug } from "./debug";
import { observer } from "mobx-react";

//@ts-ignore
window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
  //@ts-ignore
  window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });

export interface IStageDisplayable {}

export interface IStageProps {
  assetPromisesFactory?: () => Promise<void>[];
  onLoad?: (app: ExtendedApp, stage: PIXI.Container) => Promise<void>;
  rightAdd?: React.FC;
  leftAdd?: React.FC;
}

export const Stage: React.FC<IStageProps> = (props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = React.useState<number>(1);
  const [ready, setReady] = React.useState(false);
  const [app, setApp] = React.useState<ExtendedApp>();
  React.useEffect(() => {
    if (!canvasRef.current) return;

    const _app = new ExtendedApp({
      backgroundColor: 0x140f24, // нужно - совпадает с фоном элемента
      resolution: 1, // нужно
      view: canvasRef.current,
      width: 400,
      height: 300,
      sharedTicker: true,
      zoom: 1,
    });

    setApp(_app);

    addBrowserExtensionDebug(_app);
    if (
      props.assetPromisesFactory !== undefined &&
      props.onLoad !== undefined
    ) {
      loadAssets(props.assetPromisesFactory!()).then(() => {
        _app.stage.interactive = true;
        if (props.leftAdd) _app.stage.addChild();
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

        props.onLoad!(_app, _app.stage).then(() => setReady(ready));
      });
    }
  }, [canvasRef.current]);
  return (
    <StageWrapper>
      <StageText>Spine</StageText>
      <StageInner>
        <ZoomCase>Scale: {Math.round(zoom * 10) / 10}</ZoomCase>
        <canvas
          ref={canvasRef}
          style={{ opacity: ready ? "100%" : "0%" }}
        ></canvas>
      </StageInner>
      {app && <Ddd app={app} />}
    </StageWrapper>
  );
};

const Ddd = observer((props: { app: ExtendedApp }) => {
  return <div>{props.app.appStore.test}</div>;
});
