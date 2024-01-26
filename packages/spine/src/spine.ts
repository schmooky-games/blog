import type {
  AnimationStateListener,
  SkeletonData,
  Timeline,
} from "@pixi-spine/all-4.1";
import { AttachmentTimeline } from "@pixi-spine/all-4.1";
import * as PIXISpine from "@pixi-spine/all-4.1"
import { Assets } from "@pixi/assets";
import type * as PIXI from "pixi.js";

type Nullable<T> = T | null;

interface AutomationContainer extends PIXI.Container {
  automationID?: string;
}


export class Spine extends PIXISpine.Spine {
  protected externalListener: Nullable<AnimationStateListener> = null;

  constructor(spineData: SkeletonData | string) {
    super(
      typeof spineData === "string" ? Assets.cache.get(spineData) : spineData
    );
  }
  get animationNames(): string[] {
    return this.spineData.animations.map((foo) => foo.name);
  }

  updateListener(payload: Nullable<AnimationStateListener>): void {
    this.state.removeListener(this.externalListener!);
    if (payload && Object.keys(payload).length > 0) {
      this.externalListener = { ...payload };
      this.state.addListener(this.externalListener);
    }
  }

  play(speed = 1): void {
    this.state.timeScale = speed;
  }

  stop(hardResetSpine = false): void {
    if (hardResetSpine) {
      this.autoUpdateTransform();
    }
    this.state.timeScale = 0;
  }

  getSlotPixiContainer(slotName: string): PIXI.Container {
    const index = this.skeleton.data.findSlotIndex(slotName);
    return this.slotContainers[index]!;
  }


  getBoneContainer(boneName: string): PIXI.Container {
    const index = this.skeleton.data.findBoneIndex(boneName);
    return this.slotContainers[index]!;
  }

  appendToSlot(
    slotName: string,
    displayObject: PIXI.DisplayObject
  ): PIXI.DisplayObject | undefined {
    const slot = this.getSlotPixiContainer(slotName);

    // if (!slot.children.length) return;
    slot.addChildAt(displayObject, slot.children.length);
    return displayObject;
  }

  removeFromSlot(slotName: string): void {
    const slot = this.getSlotPixiContainer(slotName);
    if (slot.children.length === 0)
      throw new Error(
        `Tried to remove from slot ${slotName} while it is empty`
      );

    // eslint-disable-next-line no-unused-expressions
    slot.removeChildAt(slot.children.length - 1);
  }

  removeAllFromSlot(slotName: string): void {
    const slot = this.getSlotPixiContainer(slotName);
    if (slot.children.length === 0)
      throw new Error(
        `Tried to remove from slot ${slotName} while it is empty`
      );

    // eslint-disable-next-line no-unused-expressions
    slot.removeChildren();
  }

  /**
   * @param  {string[]} slots Массив имен слотов для которых надо вызвать removeFromSlot
   */
  removeFromSlots(slots: string[]): void {
    slots.forEach((slot) => this.removeFromSlot(slot));
  }

  /**
   * @param  {string} slotName Добавляет имя для автоматизации и интеграционных тестов
   */
  addAutomationID(slotName: string): void {
    const slot = this.getSlotPixiContainer(slotName);
    (slot as unknown as AutomationContainer).automationID = slotName;
  }

  public getAnimationSlotIndexes = (
    animationName: string
  ): number[] | undefined =>
    this.spineData.animations
      .find((el) => el.name === animationName)
      ?.timelines.map((el: Timeline) => (el as AttachmentTimeline).slotIndex);

  public getAnimationDisplaySizeByTrack = (
    trackN: number
  ): { w: number; h: number } => {
    let w = 0;
    let h = 0;
    if (this.state.tracks[trackN]?.animation?.name)
      this.getAnimationSlotIndexes(
        this.state.tracks[trackN]!.animation!.name
      )?.forEach((el, index) => {
        if (!this.slotContainers[el]) return;
        if (!index) {
          w = this.slotContainers[el]?.width ?? 0;
          h = this.slotContainers[el]?.height ?? 0;
        } else {
          if (this.slotContainers[el]!.width > w) {
            w = this.slotContainers[el]?.width ?? 0;
          }

          if (this.slotContainers[el]!.height > h) {
            h = this.slotContainers[el]?.height ?? 0;
          }
        }
      });

    return { w: w, h: h };
  };
}
