import dayjs from 'dayjs';
import { getHeavenlyStemAndEarthlyBranchBySolarDate, normalizeDateStr, solar2lunar } from 'lunar-lite';
import { EARTHLY_BRANCHES } from '../data';
import { Astrolabe, Horoscope, Plugin } from '../data/types';
import { EarthlyBranchKey, EarthlyBranchName, HeavenlyStemName, kot, PalaceName, StarKey, StarName, t } from '../i18n';
import { getHoroscopeStar, getYearly12 } from '../star';
import { IFunctionalStar } from '../star/FunctionalStar';
import { fixEarthlyBranchIndex, fixIndex, getMutagensByHeavenlyStem, timeToIndex } from '../utils';
import { getPalace, getSurroundedPalaces } from './analyzer';
import { IFunctionalPalace } from './FunctionalPalace';
import { IFunctionalSurpalaces } from './FunctionalSurpalaces';
import { getPalaceNames } from './palace';
import FunctionalHoroscope, { IFunctionalHoroscope } from './FunctionalHoroscope';
import { getConfig } from './astro';

/**
 * 获取运限数据
 *
 * @version v0.2.1
 *
 * @private 私有方法
 *
 * @param $ 星盘对象
 * @param targetDate 阳历日期【可选】，默认为调用时日期
 * @param timeIndex 时辰序号【可选】，若不传会返回 `targetDate` 中时间所在的时辰
 * @returns 运限数据
 */
const _getHoroscopeBySolarDate = (
  $: FunctionalAstrolabe,
  targetDate: string | Date = new Date(),
  timeIndex?: number,
): IFunctionalHoroscope => {
    throw new Error("STUB");
};

/**
 * 星盘类接口定义。
 *
 * 文档地址：https://docs.iztro.com/posts/astrolabe.html#functionalastrolabe
 */
export interface IFunctionalAstrolabe extends Astrolabe {
  /**
   * 插件注入方法
   *
   * @version v2.3.0
   *
   * @param plugin 插件函数
   */
  use(plugin: Plugin): void;
  /**
   * 获取运限数据
   *
   * @version v0.2.0
   *
   * @param date 阳历日期【可选】，默认为调用时的日期
   * @param timeIndex 时辰索引【可选】，默认会自动读取当前时间的时辰
   * @returns 运限数据
   */
  horoscope: (date?: string | Date, timeIndex?: number) => IFunctionalHoroscope;

  /**
   * 通过星耀名称获取到当前星耀的对象实例
   *
   * @version v1.2.0
   *
   * @param starName 星耀名称
   * @returns 星耀实例
   */
  star: (starName: StarName) => IFunctionalStar;

  /**
   * 获取星盘的某一个宫位
   *
   * @version v1.0.0
   *
   * @param indexOrName 宫位索引或者宫位名称
   * @returns 对应的宫位数据，若没有找到则返回undefined
   */
  palace: (indexOrName: number | PalaceName) => IFunctionalPalace | undefined;

  /**
   * 获取三方四正宫位，所谓三方四正就是传入的目标宫位，以及其对宫，财帛位和官禄位，总共四个宫位
   *
   * @version v1.1.0
   *
   * @param indexOrName 宫位索引或者宫位名称
   * @returns 三方四正宫位
   */
  surroundedPalaces: (indexOrName: number | PalaceName) => IFunctionalSurpalaces;

  /**
   *
   * 判断某一个宫位三方四正是否包含目标星耀，必须要全部包含才会返回true
   *
   * @version v1.0.0
   *
   * @param indexOrName 宫位索引或者宫位名称
   * @param stars 星耀名称数组
   * @returns true | false
   */
  isSurrounded: (indexOrName: number | PalaceName, stars: StarName[]) => boolean;

  /**
   * 判断三方四正内是否有传入星耀的其中一个，只要命中一个就会返回true
   *
   * @version v1.1.0
   * @deprecated v1.2.0
   *
   * @param indexOrName 宫位索引或者宫位名称
   * @param stars 星耀名称数组
   * @returns true | false
   */
  isSurroundedOneOf: (indexOrName: number | PalaceName, stars: StarName[]) => boolean;

  /**
   * 判断某一个宫位三方四正是否不含目标星耀，必须要全部都不在三方四正内含才会返回true
   *
   * @version v1.1.0
   * @deprecated v1.2.0
   *
   * @param indexOrName 宫位索引或者宫位名称
   * @param stars 星耀名称数组
   * @returns true | false
   */
  notSurrounded: (indexOrName: number | PalaceName, stars: StarName[]) => boolean;
}

/**
 * 星盘类。
 *
 * 文档地址：https://docs.iztro.com/posts/astrolabe.html#functionalastrolabe
 */
export default class FunctionalAstrolabe implements IFunctionalAstrolabe {
  gender;
  solarDate;
  lunarDate;
  chineseDate;
  rawDates;
  time;
  timeRange;
  sign;
  zodiac;
  earthlyBranchOfSoulPalace;
  earthlyBranchOfBodyPalace;
  soul;
  body;
  fiveElementsClass;
  palaces;
  copyright;

  // 保存插件列表
  private plugins: Plugin[] = [];

  constructor(data: Astrolabe) {
      throw new Error("STUB");
  }

  use(plugin: Plugin): void {
      throw new Error("STUB");
  }

  star = (starName: StarName): IFunctionalStar => {
      throw new Error("STUB");
  };

  horoscope = (targetDate: string | Date = new Date(), timeIndexOfTarget?: number) =>
    { throw new Error("STUB"); };

  palace = (indexOrName: number | PalaceName): IFunctionalPalace | undefined => getPalace(this, indexOrName);

  surroundedPalaces = (indexOrName: number | PalaceName): IFunctionalSurpalaces =>
    { throw new Error("STUB"); };

  /**
   * @deprecated 此方法已在`v1.2.0`废弃，请用下列方法替换
   *
   * @example
   *  // AS IS
   *  astrolabe.isSurrounded(0, ["紫微"]);
   *
   *  // TO BE
   *  astrolabe.surroundedPalaces(0).have(["紫微"]);
   */
  isSurrounded = (indexOrName: number | PalaceName, stars: StarName[]): boolean =>
    { throw new Error("STUB"); };

  /**
   * @deprecated 此方法已在`v1.2.0`废弃，请用下列方法替换
   *
   * @example
   *  // AS IS
   *  astrolabe.isSurroundedOneOf(0, ["紫微"]);
   *
   *  // TO BE
   *  astrolabe.surroundedPalaces(0).haveOneOf(["紫微"]);
   */
  isSurroundedOneOf = (indexOrName: number | PalaceName, stars: StarName[]): boolean =>
    { throw new Error("STUB"); };

  /**
   * @deprecated 此方法已在`v1.2.0`废弃，请用下列方法替换
   *
   * @example
   *  // AS IS
   *  astrolabe.notSurrounded(0, ["紫微"]);
   *
   *  // TO BE
   *  astrolabe.surroundedPalaces(0).notHave(["紫微"]);
   */
  notSurrounded = (indexOrName: number | PalaceName, stars: StarName[]): boolean =>
    { throw new Error("STUB"); };
}
