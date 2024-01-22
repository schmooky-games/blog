import { Spine } from "pixi-spine";
import * as PIXI from "pixi.js";

export class UploadSpine extends Spine {
  constructor(spineName: string) {
    if (PIXI.Assets.cache.get(spineName))
      super(PIXI.Assets.cache.get(spineName));
    else {
      throw new Error("Provided name does not exist in cache");
    }
  }
  get animationNames(): string[] {
    return this.spineData.animations.map((foo) => foo.name);
  }
}
