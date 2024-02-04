import { grandMeleeFactory } from "@repo/thunderkick";
import { Stage } from "@repo/stage";
import { Spine } from "@repo/spine";

const GrandMeleeLowsStage = ()=> <Stage assetPromisesFactory={grandMeleeFactory}
onLoad ={async (app, stage) => {
  const spine = new Spine("thunderkick-grand-melee-lows");
  stage.addChild(spine);
  app.appStore.animationStore.setSpineObj(spine);
  spine.skeleton.setSkinByName('low2');
}}/>

export default GrandMeleeLowsStage;