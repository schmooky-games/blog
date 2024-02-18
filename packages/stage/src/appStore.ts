import { makeAutoObservable } from "mobx";
import { IAnimation, Spine } from "@repo/spine";
import { AnimationState, Skeleton, Skin } from "@pixi-spine/all-4.1";

export class AppStore {
  animationStore: AnimationStore;
  skinstore: SkinStore;
  test = "test";
  constructor() {
    makeAutoObservable(this);
    this.animationStore = new AnimationStore(this);
    this.skinstore = new SkinStore(this);
  }
}

class AnimationStore {
  appStore: AppStore;
  state: AnimationState | undefined;
  animationNames: Array<string> | undefined;
  currentAnimation: IAnimation | undefined;
  constructor(appStore: AppStore) {
    makeAutoObservable(this, { appStore: false });
    this.appStore = appStore;
  }
  setSpineObj(spine: Spine) {
    this.animationNames = spine.animationNames;
    this.state = spine.state;
  }
  setCurrentAnimation(crntAnim: IAnimation | undefined) {
    this.currentAnimation = crntAnim;
  }
}

class SkinStore {
  appStore: AppStore;
  skins: Array<Skin> | undefined;
  skeleton: Skeleton | undefined;
  constructor(appStore: AppStore) {
    makeAutoObservable(this, { appStore: false });
    this.appStore = appStore;
  }
  setData(spine: Spine) {
    this.skins = spine.spineData.skins;
    this.skeleton = spine.skeleton;
  }
}
