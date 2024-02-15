import React, { useContext } from "react";
import { Case, CaseWrapper } from "./styles";
import { observer } from "mobx-react";
import { AppContext } from "@repo/stage/src/app";

export const AnimAddition: React.FC = observer(() => {
  const { app } = useContext(AppContext) ?? {};
  app &&
    app.appStore.animationStore.state?.addListener({
      start(entry) {
        console.log("Anim started");
        //@ts-ignore
        app.appStore.animationStore.setCurrentAnimation(entry.animation);
      },
      interrupt(entry) {},
      end(entry) {},
      dispose(entry) {},
      complete(entry) {
        console.log("Anim Ended");
        app.appStore.animationStore.setCurrentAnimation(undefined);
      },
      event(entry, event) {},
    });
  return (
    app && (
      <CaseWrapper>
        {app.appStore.animationStore.animationNames &&
          app.appStore.animationStore.animationNames.map((foo, i) => (
            <Case
              curent={
                app.appStore.animationStore.currentAnimation?.name === foo
              }
              onClick={() =>
                app.appStore.animationStore.state?.setAnimation(0, foo, false)
              }
              key={i}
            >
              {foo}
            </Case>
          ))}
      </CaseWrapper>
    )
  );
});
