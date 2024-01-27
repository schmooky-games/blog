import { grandMeleeFactory } from "./grandMeleeFactory";
import { Stage } from "@repo/stage";

export const GrandMAnimPreviewStage = () => {
  return (
    <Stage
      onLoad={async () => {
        return console.log("aaa");
      }}
      assetPromisesFactory={grandMeleeFactory}
    />
  );
};
