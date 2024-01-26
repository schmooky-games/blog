import * as PIXI from "pixi.js";

export interface IExtendedAppOptions extends PIXI.IApplicationOptions {
  zoom: number;
}

/**
 * Класс, расширяющий базовый класс PIXI.Application.
 * Добавляет возможность масштабирования (зума).
 *
 * @class
 * @extends PIXI.Application
 */
export class ExtendedApp extends PIXI.Application {
  /**
   * Установить значение масштаба (зума) сцены.
   * Входное значение ограничивается в диапазоне от 0.1 до 10.
   *
   * @param {number} value - Значение масштаба.
   */
  set zoom(value: number) {
    this.stage.scale.set(1 / Math.min(10, Math.max(0.1, +value.toFixed(2))));
  }

  /**
   * Получить текущее значение масштаба (зума) сцены.
   *
   * @return {number} Текущее значение масштаба.
   */
  get zoom(): number {
    return 1 / this.stage.scale.x;
  }

  /**
   * Создает экземпляр ExtendedApp.
   *
   * @param {Partial<IExtendedAppOptions>} [options] - Набор опций для инициализации приложения.
   */
  constructor(options?: Partial<IExtendedAppOptions>) {
    super(options);
    this.stage.x = this.renderer.view.width / 2;
    this.stage.y = this.renderer.view.height / 2;
  }
}
