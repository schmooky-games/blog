import React, { useContext } from "react";
import { Case, CaseWrapper } from "./styles";
import { observer } from "mobx-react";
import { AppContext } from "@repo/stage/src/app";

export const AnimAddition: React.FC = observer(() => {
  const { app } = useContext(AppContext) ?? {};
  console.log("🥼", app);
  return (
    app && (
      <CaseWrapper>
        {app.appStore.animationStore.spineObj &&
          app.appStore.animationStore.spineObj.animationNames.map((foo, i) => (
            <Case
              animPlayed={
                app.appStore.animationStore.currentAnimation?.name === foo
              }
              onClick={() =>
                app.appStore.animationStore.spineObj?.state.setAnimation(
                  0,
                  foo,
                  false
                )
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
