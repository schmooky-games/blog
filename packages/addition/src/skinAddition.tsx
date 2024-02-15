import React, { useContext } from "react";
import { Case, CaseWrapper } from "./styles";
import { observer } from "mobx-react";
import { AppContext } from "@repo/stage/src/app";

export const SkinAddition: React.FC = observer(() => {
  const { app } = useContext(AppContext) ?? {};

  return (
    app && (
      <CaseWrapper style={{ overflow: "hidden" }}>
        {app.appStore.skinstore.skins &&
          app.appStore.skinstore.skins.map((foo, i) => (
            <Case
              curent={app.appStore.skinstore.currentSkin === foo}
              onClick={() => {
                //@ts-ignore
                app.appStore.skinstore.skeleton?.setSkin(foo);
                app.appStore.skinstore.setCurrentSkin(foo);
              }}
              key={i}
            >
              {foo.name}
            </Case>
          ))}
      </CaseWrapper>
    )
  );
});
