import React, { ChangeEvent, ChangeEventHandler, useContext } from "react";
import { SkinSelect } from "./styles";
import { observer } from "mobx-react";
import { AppContext } from "@repo/stage/src/app";
import { Skin } from "@pixi-spine/all-4.1";

export interface ISkinAddition {
  showSkin?: boolean | Array<string> | ((name: string) => boolean);
}

export const SkinAddition: React.FC<ISkinAddition> = observer((props) => {
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
        {!skinName && <option value={""}>-- Chose skin --</option>}
        {app.appStore.skinstore.skins &&
          ((Array.isArray(props.showSkin) &&
            props.showSkin.map((foo, i) => (
              <option value={foo} key={i}>
                {foo}
              </option>
            ))) ||
            (props.showSkin &&
              app.appStore.skinstore.skins.slice(1).map((foo, i) => (
                <option value={foo.name} key={i}>
                  {foo.name}
                </option>
              ))))}
      </SkinSelect>
    )
  );
});
