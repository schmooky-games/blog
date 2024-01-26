import type { SkeletonData } from "@pixi-spine/all-4.1";
import { PixiComponent } from "@pixi/react";
import { ExtendedSpine } from "./extendedSpine.pixi";
import { Newable } from "./Stage";

type Nullable<T> = T | null;

export interface ActionSpineProps {
  spineName: SkeletonData;
  spineAction?: Nullable<(_spine: ExtendedSpine) => void>;
  name?: string;
  x?: number;
  y?: number;
  scale?: number;
  alpha?: number;
}

const TYPE = "ActionSpine";

function updateCommonProps(
  spine: ExtendedSpine,
  newProps: ActionSpineProps,
  oldProps: ActionSpineProps
): void {
  const { x, y, scale, alpha } = newProps;
  if ((x && x !== oldProps.x) || (y && y !== oldProps.y)) {
    spine.position.set(x || spine.x, y || spine.y);
  }
  if (scale && scale !== oldProps.scale) {
    spine.scale.set(scale);
  }
  if (alpha && alpha !== oldProps.alpha) {
    // eslint-disable-next-line no-param-reassign
    spine.alpha = alpha;
  }
}

function executeAction(
  spine: ExtendedSpine,
  newProps: ActionSpineProps,
  oldProps: ActionSpineProps
): void {
  const { spineAction } = newProps;

  if (spineAction && spineAction !== oldProps.spineAction) {
    spineAction(spine);
  }
}

const lifecycle = {
  create: (props: ActionSpineProps): SkeletonData => {
    const spine = props.spineName;
    if (props.name) {
      spine.name = props.name;
    }
    return spine;
  },
  applyProps(
    instance: ExtendedSpine,
    oldProps: ActionSpineProps,
    newProps: ActionSpineProps
  ): void {
    updateCommonProps(instance, newProps, oldProps);
    executeAction(instance, newProps, oldProps);
  },
};

export const ActionSpine = PixiComponent(TYPE, lifecycle);
