import { prototypeFactory } from "@repo/reels-gamma";
import { Stage } from "@repo/reels-gamma";
import { Assets, Sprite } from "pixi.js";

const ReelsPrototype = ()=> <Stage assetPromisesFactory={prototypeFactory}
onLoad ={async (app, stage) => {
  const a = app.reels.symbolFactory(1);
  (a as unknown as Sprite).anchor.set(0.5);
  stage.addChild(a)
  // app.reels.addChild(a);
}}/>

export default ReelsPrototype;