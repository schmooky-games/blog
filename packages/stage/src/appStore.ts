import { makeAutoObservable } from "mobx";

export class AppStore {
  animationStore: AnimationStore;
  test = "test";
  constructor() {
    makeAutoObservable(this);
  }
}

class AnimationStore {}
