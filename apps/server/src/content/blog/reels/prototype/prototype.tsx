import { prototypeFactory } from "@repo/thunderkick";
import { Stage } from "@repo/stage";
import { Assets, Sprite } from "pixi.js";

const ReelsPrototype = ()=> <Stage assetPromisesFactory={prototypeFactory}
onLoad ={async (app, stage) => {
  console.log(Assets.cache);
  const sprite = new Sprite(Assets.cache.get('wild/wild_1'));
//@ts-ignore
  stage.addChild(sprite);}}/>

export default ReelsPrototype;