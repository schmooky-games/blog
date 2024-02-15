import { ExtendedApp } from "./app";

export const addBrowserExtensionDebug = (app: ExtendedApp) => {
  //@ts-ignore
  globalThis.__PIXI_APP__ = app;
};
