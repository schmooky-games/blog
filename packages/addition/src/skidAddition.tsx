import React, { useContext } from "react";
import { Case, CaseWrapper } from "./styles";
import { observer } from "mobx-react";
import { AppContext } from "@repo/stage/src/app";

export const SkinAddition: React.FC = observer(() => {
  const { app } = useContext(AppContext) ?? {};
  app &&
    app.appStore.skinstore.state?.addListener({
      start(entry) {
        console.log("Anim started");
        //@ts-ignore
        app.appStore.skin.setCurrentSkin(entry.animation);
      },
      interrupt(entry) {},
      end(entry) {},
      dispose(entry) {},
      complete(entry) {
        console.log("Anim Ended");
        app.appStore.skinstore.setCurrentSkin(undefined);
      },
      event(entry, event) {},
    });
  console.log("🥼", app);
  return (
    app && (
      <CaseWrapper>
        {app.appStore.skinstore.skins &&
          app.appStore.skinstore.skins.map((foo, i) => (
            <Case
              curent={app.appStore.skinstore.currentSkin == foo}
              onClick={() => app.appStore.skinstore.skeleton?.setSkin(foo)}
              key={i}
            >
              {foo.name}
            </Case>
          ))}
      </CaseWrapper>
    )
  );
});
