import { makeAutoObservable, observable } from "mobx";
import { IAnimation, Spine } from "@repo/spine";

export class AppStore {
  animationStore: AnimationStore;
  assetsStore: AssetsStore;
  test = "test";
  constructor() {
    makeAutoObservable(this);
    this.animationStore = new AnimationStore(this);
    this.assetsStore = new AssetsStore();
  }
}

class AnimationStore {
  appStore: AppStore;
  spineObj: Spine | undefined;
  currentAnimation: IAnimation | undefined;
  constructor(appStore: AppStore) {
    makeAutoObservable(this, { appStore: false });
    this.appStore = appStore;
  }
  setSpineObj(spine: Spine) {
    this.spineObj = spine;
  }
  setCurrentAnimation(crntAnim: IAnimation) {
    this.currentAnimation = crntAnim;
  }
}

class AssetsStore {}
