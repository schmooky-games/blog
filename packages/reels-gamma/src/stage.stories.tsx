import type { Meta, StoryObj } from "@storybook/react";

import { Stage } from "./stage";
import { AnimAddition } from "@repo/addition";
import { grandMeleeFactory, prototypeFactory } from "@repo/thunderkick";
import { Spine } from "@repo/spine";
import { ReelsBase } from "./reels";
import { Assets } from "pixi.js";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Stage",
  component: Stage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Stage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    assetPromisesFactory: prototypeFactory,
    onLoad: async (app, stage) => {
      const reels =  new ReelsBase();
      stage.addChild(reels)
    },
  },
};
