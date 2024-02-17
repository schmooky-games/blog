import React, { ChangeEvent, ChangeEventHandler, useContext } from "react";
import { SkinSelect } from "./styles";
import { observer } from "mobx-react";
import { AppContext } from "@repo/stage/src/app";
import { Skin } from "@pixi-spine/all-4.1";

export const SkinAddition: React.FC = observer(() => {
  const { app } = useContext(AppContext) ?? {};
  const [skinName, setSkinName] = React.useState<string>();
  const changeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSkinName(event.target.value);
  };
  if (skinName) {
    app?.appStore.skinstore.skeleton?.setSkinByName(skinName);
  }
  return (
    app && (
      <SkinSelect onChange={changeHandler} value={skinName}>
        <option value={""}>-- Chose skin --</option>
        {app.appStore.skinstore.skins &&
          app.appStore.skinstore.skins.slice(1).map((foo, i) => (
            <option value={foo.name} key={i}>
              {foo.name}
            </option>
          ))}
      </SkinSelect>
    )
  );
});
