import { IFunctionalAstrolabe } from '../astro/FunctionalAstrolabe';
import { IFunctionalPalace } from '../astro/FunctionalPalace';
import { IFunctionalSurpalaces } from '../astro/FunctionalSurpalaces';
import { Star } from '../data/types';
import { Brightness, BrightnessKey, kot, Mutagen, MutagenKey } from '../i18n';

/**
 * 星耀类的接口定义
 *
 * 文档地址：https://docs.iztro.com/posts/star.html#functionalstar
 */
export interface IFunctionalStar extends Star {
  /**
   * 获取星耀所在宫位
   *
   * @version v1.2.0
   *
   * @returns 星耀所在宫位
   */
  palace: () => IFunctionalPalace | undefined;
  /**
   * 设置当前星耀所在宫位
   *
   * @param p 宫位的实例
   */
  setPalace: (p: IFunctionalPalace) => void;
  /**
   * 设置当前星耀所在星盘
   *
   * @version v1.2.0
   *
   * @param a 星盘实例
   */
  setAstrolabe: (a: IFunctionalAstrolabe) => void;
  /**
   * 获取当前星耀的三方四正宫位
   *
   * @version v1.2.0
   *
   * @returns 三方四正宫位 ｜ undefined
   */
  surroundedPalaces: () => IFunctionalSurpalaces | undefined;
  /**
   * 获取当前星耀的对宫
   *
   * @version v1.2.0
   *
   * @returns 对宫 ｜ undefined
   */
  oppositePalace: () => IFunctionalPalace | undefined;
  /**
   * 判断星耀是否是传入的亮度，也可以传入多个亮度，只要匹配到一个亮度就会返回 `true`
   *
   * @version v1.2.0
   *
   * @param brightness 星耀亮度
   * @returns true | false
   */
  withBrightness: (brightness: Brightness | Brightness[]) => boolean;
  /**
   * 判断星耀是否产生了四化
   *
   * @version v1.2.0
   *
   * @param mutagen 四化【禄|权|科|忌】
   * @returns true | false
   */
  withMutagen: (mutagen: Mutagen | Mutagen[]) => boolean;
}

/**
 * 星耀类。
 *
 * 文档地址：https://docs.iztro.com/posts/star.html
 */
export default class FunctionalStar implements IFunctionalStar {
  name;
  type;
  scope;
  brightness?;
  mutagen?;
  private _palace?: IFunctionalPalace;
  private _astrolabe?: IFunctionalAstrolabe;

  constructor(data: Star) {
      throw new Error("STUB");
  }

  oppositePalace = (): IFunctionalPalace | undefined => {
      throw new Error("STUB");
  };

  setPalace = (p: IFunctionalPalace) => {
      throw new Error("STUB");
  };

  setAstrolabe = (a: IFunctionalAstrolabe) => {
    this._astrolabe = a;
  };

  palace = (): IFunctionalPalace | undefined => this._palace;

  surroundedPalaces = (): IFunctionalSurpalaces | undefined => {
      throw new Error("STUB");
  };

  withMutagen = (mutagen: Mutagen | Mutagen[]): boolean => {
      throw new Error("STUB");
  };

  withBrightness = (brightness: Brightness | Brightness[]): boolean => {
      throw new Error("STUB");
  };
}
