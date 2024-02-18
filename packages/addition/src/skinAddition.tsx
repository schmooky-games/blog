import React, { ChangeEvent, ChangeEventHandler, useContext } from "react";
import { SkinSelect } from "./styles";
import { observer } from "mobx-react";
import { AppContext } from "@repo/stage/src/app";
import { Skin } from "@pixi-spine/all-4.1";

export interface ISkinAddition {
  showSkin: boolean | Array<string> | ((name: string) => boolean);
}

export const SkinAddition: React.FC<ISkinAddition> = observer((props) => {
  const { app } = useContext(AppContext) ?? {};
  const [skinName, setSkinName] = React.useState<string>();
  const changeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSkinName(event.target.value);
  };
  const skinsToShow: Skin[] | undefined = (() => {
    if (typeof props.showSkin === "boolean") {
      console.log(props.showSkin);
      return app?.appStore.skinstore.skins;
    } else if (Array.isArray(props.showSkin)) {
      return app?.appStore.skinstore.skins?.filter((skin) =>
        console.log(props.showSkin)
      );
    }
    return new Array<Skin>();
  })();
  if (skinName) {
    app?.appStore.skinstore.skeleton?.setSkinByName(skinName);
  }
  return (
    app &&
    skinsToShow && (
      <SkinSelect onChange={changeHandler} value={skinName}>
        <option value={""}>-- Chose skin --</option>
        {app.appStore.skinstore.skins &&
          skinsToShow.slice(1).map((foo, i) => (
            <option value={foo.name} key={i}>
              {foo.name}
            </option>
          ))}
      </SkinSelect>
    )
  );
});
