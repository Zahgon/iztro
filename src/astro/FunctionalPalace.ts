import { Palace } from '../data/types';
import { Mutagen, PalaceName, StarName } from '../i18n';
import { IFunctionalAstrolabe } from './FunctionalAstrolabe';
import {
  hasMutagenInPlace,
  hasOneOfStars,
  hasStars,
  mutagensToStars,
  notHaveMutagenInPalce,
  notHaveStars,
} from './analyzer';

/**
 * 宫位类的接口定义。
 *
 * 文档地址：https://docs.iztro.com/posts/palace.html#functionalastrolabe
 */
export interface IFunctionalPalace extends Palace {
  /**
   * 判断某个宫位内是否有传入的星耀，要所有星耀都在宫位内才会返回true
   *
   * @version v1.0.0
   *
   * @param stars 星耀名称，可以包含主星、辅星、杂耀
   * @returns true | false
   */
  has: (stars: StarName[]) => boolean;

  /**
   * 判断某个宫位内是否有传入的星耀，要所有星耀都不在宫位内才会返回true
   *
   * @version v1.0.0
   *
   * @param stars 星耀名称，可以包含主星、辅星、杂耀
   * @returnstrue | false
   */
  notHave: (stars: StarName[]) => boolean;

  /**
   * 判断某个宫位内是否有传入星耀的其中一个，只要命中一个就会返回true
   *
   * @version v1.0.0
   *
   * @param stars 星耀名称，可以包含主星、辅星、杂耀
   * @returns true | false
   */
  hasOneOf: (stars: StarName[]) => boolean;

  /**
   * 判断宫位内是否有生年四化
   *
   * @version v1.2.0
   *
   * @param mutagen 四化名称【禄｜权｜科｜忌】
   * @returns true | false
   */
  hasMutagen: (mutagen: Mutagen) => boolean;

  /**
   * 判断宫位内是否没有生年四化
   *
   * @version v1.2.0
   *
   * @param mutagen 四化名称【禄｜权｜科｜忌】
   * @returns true | false
   */
  notHaveMutagen: (mutagen: Mutagen) => boolean;

  /**
   * 判断一个宫位是否为空宫（没有主星），
   * 有些派别在宫位内有某些星耀的情况下，
   * 是不会将该宫位判断为空宫的。
   * 所以加入一个参数来传入星耀。
   *
   * @version v2.0.6
   *
   * @param excludeStars 星耀名称数组
   *
   * @returns {boolean}  true | false
   */
  isEmpty: (excludeStars?: StarName[]) => boolean;

  /**
   * 给宫位设置星盘对象
   *
   * @version v2.1.0
   *
   * @param astro 星盘对象
   * @returns {void}
   */
  setAstrolabe: (astro: IFunctionalAstrolabe) => void;

  /**
   * 获取当前宫位所在的星盘对象
   *
   * @version v2.1.0
   *
   * @returns {IFunctionalAstrolabe}
   */
  astrolabe: () => IFunctionalAstrolabe | undefined;

  /**
   * 判断是否从源宫位飞化到目标宫位，四化可传入一个数组或者一个字符串，传入四化全部飞化到目标宫位即返回true
   *
   * @version v2.1.0
   *
   * @param  to 目标宫位
   * @param withMutagens 四化（禄、权、科、忌）
   * @returns {boolean}
   */
  fliesTo: (to: number | PalaceName, withMutagens: Mutagen | Mutagen[]) => boolean;

  /**
   * 判断是否从源宫位飞化其中一颗四化星到目标宫位，传入四化只要有一颗飞化到目标宫位即返回true
   *
   * @version v2.1.0
   *
   * @param  to 目标宫位
   * @param withMutagens 四化（禄、权、科、忌）
   * @returns {boolean}
   */
  fliesOneOfTo: (to: number | PalaceName, withMutagens: Mutagen[]) => boolean;

  /**
   * 判断是否没有从源宫位飞化到目标宫位，四化可传入一个数组或者一个字符串，传入四化全部没有飞化到目标宫位才返回true
   *
   * @version v2.1.0
   *
   * @param to 目标宫位
   * @param withMutagens 四化（禄、权、科、忌）
   * @returns {boolean}
   */
  notFlyTo: (to: number | PalaceName, withMutagens: Mutagen | Mutagen[]) => boolean;

  /**
   * 判断宫位是否有自化，传入四化数组时需要全部满足才返回true
   *
   * @version v2.1.0
   *
   * @param withMutagens 四化（禄、权、科、忌）
   * @returns {boolean}
   */
  selfMutaged: (withMutagens: Mutagen | Mutagen[]) => boolean;

  /**
   * 判断宫位是否有自化，若不传入参数则会判断所有四化，满足一颗即返回true
   *
   * @version v2.1.0
   *
   * @param withMutagens 四化（禄、权、科、忌）
   * @returns {boolean}
   */
  selfMutagedOneOf: (withMutagens?: Mutagen[]) => boolean;

  /**
   * 判断宫位是否有自化，如果传入参数，则只判断传入的四化是否有自化，否则将会判断所有四化
   *
   * @version v2.1.0
   *
   * @param withMutagens 【可选】四化（禄、权、科、忌）
   * @returns {boolean}
   */
  notSelfMutaged: (withMutagens?: Mutagen | Mutagen[]) => boolean;

  /**
   * 获取当前宫位产生四化的4个宫位数组，下标分别对【禄，权，科，忌】
   *
   * @version v2.1.0
   *
   * @returns {(IFunctionalPalace | undefined)[]}
   */
  mutagedPlaces: () => (IFunctionalPalace | undefined)[];
}

/**
 * 宫位类。
 *
 * 文档地址：https://docs.iztro.com/posts/palace.html#functionalastrolabe
 */
export default class FunctionalPalace implements IFunctionalPalace {
  private _astrolabe?: IFunctionalAstrolabe;
  index;
  name;
  isBodyPalace;
  isOriginalPalace;
  heavenlyStem;
  earthlyBranch;
  majorStars;
  minorStars;
  adjectiveStars;
  changsheng12;
  boshi12;
  jiangqian12;
  suiqian12;
  decadal;
  ages;

  constructor(data: Palace) {
      throw new Error("STUB");
  }

  has = (stars: StarName[]): boolean => { throw new Error("STUB"); };
  notHave = (stars: StarName[]): boolean => { throw new Error("STUB"); };
  hasOneOf = (stars: StarName[]): boolean => { throw new Error("STUB"); };
  hasMutagen = (mutagen: Mutagen): boolean => { throw new Error("STUB"); };
  notHaveMutagen = (mutagen: Mutagen): boolean => { throw new Error("STUB"); };
  isEmpty = (excludeStars?: StarName[]) => {
      throw new Error("STUB");
  };
  setAstrolabe = (astro: IFunctionalAstrolabe) => (this._astrolabe = astro);
  astrolabe = () => { throw new Error("STUB"); };
  fliesTo = (to: number | PalaceName, withMutagens: Mutagen | Mutagen[]) => {
      throw new Error("STUB");
  };

  fliesOneOfTo = (to: number | PalaceName, withMutagens: Mutagen[]) => {
      throw new Error("STUB");
  };

  notFlyTo = (to: number | PalaceName, withMutagens: Mutagen | Mutagen[]) => {
      throw new Error("STUB");
  };

  selfMutaged = (withMutagens: Mutagen | Mutagen[]) => {
      throw new Error("STUB");
  };

  selfMutagedOneOf = (withMutagens?: Mutagen[]) => {
      throw new Error("STUB");
  };

  notSelfMutaged = (withMutagens?: Mutagen | Mutagen[]) => {
      throw new Error("STUB");
  };

  mutagedPlaces = () => {
      throw new Error("STUB");
  };
}
