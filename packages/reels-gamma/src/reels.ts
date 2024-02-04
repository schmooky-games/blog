import { makeAutoObservable } from "mobx";
import { Assets, Container, DisplayObject, Graphics, Sprite } from "pixi.js";

const prototypeStaticSymbolFactory = (id: number) => {
  switch (id) {
    case 1:
      return new Sprite(Assets.cache.get("square/square_1.png"));
    default:
      throw new Error("Invalid Symbol ID");
  }
};

export class ReelsBase<T extends number> extends Container {
  protected drawBounds = true;
  protected baseColumnCount = 5;
  protected baseRowCount = 3;
  protected symbolWidth = 300;
  protected symbolHeight = 300;

  protected debugBoundsGraphics = new Graphics();

  protected symbolFactory: (id: T) => DisplayObject =
    prototypeStaticSymbolFactory;

  constructor(symbolFactory?: (id: T) => DisplayObject) {
    super();
    if (this.drawBounds) {
      this.addChild(this.debugBoundsGraphics);
      this.drawRectangularBounds();
    }
    if (symbolFactory) {
      this.symbolFactory = symbolFactory;
    }
    console.log(Assets.cache.get("square/square_1"))
    const a = this.symbolFactory(1 as T);
    console.log(a)
    // this.addChild();
  }

  drawRectangularBounds() {
    this.debugBoundsGraphics.lineStyle({ width: 4, color: 0xff00ff });
    this.debugBoundsGraphics.drawRect(
      0,
      0,
      this.symbolWidth * this.baseColumnCount,
      this.symbolHeight * this.baseRowCount
    );
  }
}
