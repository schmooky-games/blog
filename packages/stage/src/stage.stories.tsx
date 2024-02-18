import type { Meta, StoryObj } from "@storybook/react";

import { Stage } from "./stage";
import { AnimAddition, SkinAddition } from "@repo/addition";
import { grandMeleeFactory } from "@repo/thunderkick";
import { Spine } from "@repo/spine";
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
    rightAdd: <AnimAddition />,
    leftAdd: <SkinAddition showSkin={[]} />,
    assetPromisesFactory: grandMeleeFactory,
    onLoad: async (app, stage) => {
      const spine = new Spine("thunderkick-grand-melee-lows");
      stage.addChild(spine);
      app.appStore.animationStore.setSpineObj(spine);
      app.appStore.skinstore.setData(spine);
    },
  },
};
