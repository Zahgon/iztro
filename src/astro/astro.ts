import { getHeavenlyStemAndEarthlyBranchBySolarDate, getSign, getZodiac, lunar2solar, solar2lunar } from 'lunar-lite';
import { CHINESE_TIME, EARTHLY_BRANCHES, HEAVENLY_STEMS, TIME_RANGE, earthlyBranches } from '../data';
import { Config, Language, Option, Plugin } from '../data/types';
import {
  BrightnessKey,
  EarthlyBranchKey,
  EarthlyBranchName,
  GenderName,
  HeavenlyStemKey,
  HeavenlyStemName,
  StarKey,
  StarName,
  kot,
  setLanguage,
  t,
} from '../i18n';
import {
  getAdjectiveStar,
  getBoShi12,
  getchangsheng12,
  getMajorStar,
  getMinorStar,
  getTianshiTianshangIndex,
  getYearly12,
} from '../star';
import { fixIndex, translateChineseDate } from '../utils';
import FunctionalAstrolabe from './FunctionalAstrolabe';
import FunctionalPalace, { IFunctionalPalace } from './FunctionalPalace';
import { getPalaceNames, getSoulAndBody, getHoroscope, getFiveElementsClass } from './palace';
import FunctionalStar from '../star/FunctionalStar';

const _plugins = [] as Plugin[];
const _mutagens: Partial<Record<HeavenlyStemKey, StarKey[]>> = {};
const _brightness: Partial<Record<StarKey, BrightnessKey[]>> = {};

/**
 * 年分界点参数，默认为立春分界。
 *
 * @version v2.4.0
 *
 * normal：正月初一分界
 * exact：立春分界
 */
let _yearDivide: 'normal' | 'exact' = 'normal';
let _horoscopeDivide: 'normal' | 'exact' = 'normal';

/**
 * 小限分割点，默认为生日。
 *
 * @version v2.4.5
 * @default 'normal'
 *
 * normal: 只考虑年份，不考虑生日
 * birthday: 以生日为分界点
 */
let _ageDivide: 'normal' | 'birthday' = 'normal';

let _dayDivide: 'current' | 'forward' = 'forward';

/**
 * 排盘派别设置。
 *
 * @version v2.5.0
 * @default 'default'
 *
 * default: 以《紫微斗数全书》为基础安星
 * zhongzhou: 以中州派安星法为基础安星
 */
let _algorithm: 'default' | 'zhongzhou' = 'default';

/**
 * 批量加载插件
 *
 * @version v2.3.0
 *
 * @param plugins 插件方法数组
 */
export const loadPlugins = (plugins: Plugin[]) => {
    throw new Error("STUB");
};

/**
 * 加载单个插件
 *
 * @version v2.3.0
 *
 * @param plugin 插件方法
 */
export const loadPlugin = (plugin: Plugin) => {
    throw new Error("STUB");
};

/**
 * 全局配置四化和亮度
 *
 * 由于key和value都有可能是不同语言传进来的，
 * 所以需会将key和value转化为对应的i18n key。
 *
 * @version 2.3.0
 *
 * @param {Config} param0 自定义配置
 */
export const config = ({
  mutagens,
  brightness,
  yearDivide = _yearDivide,
  ageDivide = _ageDivide,
  horoscopeDivide = _horoscopeDivide,
  dayDivide = _dayDivide,
  algorithm = _algorithm,
}: Config) => {
    throw new Error("STUB");
};

export const getConfig = () => ({
  mutagens: _mutagens,
  brightness: _brightness,
  yearDivide: _yearDivide,
  ageDivide: _ageDivide,
  dayDivide: _dayDivide,
  horoscopeDivide: _horoscopeDivide,
  algorithm: _algorithm,
});

/**
 * 通过阳历获取星盘信息
 *
 * @deprecated 此方法已在`v2.0.5`废弃，请用 `bySolar` 方法替换，参数不变
 *
 * @param solarDateStr 阳历日期【YYYY-M-D】
 * @param timeIndex 出生时辰序号【0~12】
 * @param gender 性别【男|女】
 * @param fixLeap 是否调整闰月情况【默认 true】，假入调整闰月，则闰月的前半个月算上个月，后半个月算下个月
 * @param language 输出语言
 * @returns 星盘信息
 */
export function astrolabeBySolarDate<T extends FunctionalAstrolabe>(
  solarDateStr: string,
  timeIndex: number,
  gender: GenderName,
  fixLeap: boolean = true,
  language?: Language,
): T {
    throw new Error("STUB");
}

/**
 * 通过阳历获取星盘信息
 *
 * @param solarDate 阳历日期【YYYY-M-D】
 * @param timeIndex 出生时辰序号【0~12】
 * @param gender 性别【男|女】
 * @param fixLeap 是否调整闰月情况【默认 true】，假入调整闰月，则闰月的前半个月算上个月，后半个月算下个月
 * @param language 输出语言
 * @returns 星盘信息
 */
export function bySolar<T extends FunctionalAstrolabe>(
  solarDate: string,
  timeIndex: number,
  gender: GenderName,
  fixLeap: boolean = true,
  language?: Language,
): T {
    throw new Error("STUB");
}

/**
 * 通过农历获取星盘信息
 *
 * @deprecated 此方法已在`v2.0.5`废弃，请用 `byLunar` 方法替换，参数不变
 *
 * @param lunarDateStr 农历日期【YYYY-M-D】，例如2000年七月十七则传入 2000-7-17
 * @param timeIndex 出生时辰序号【0~12】
 * @param gender 性别【男|女】
 * @param isLeapMonth 是否闰月【默认 false】，当实际月份没有闰月时该参数不生效
 * @param fixLeap 是否调整闰月情况【默认 true】，假入调整闰月，则闰月的前半个月算上个月，后半个月算下个月
 * @param language 输出语言
 * @returns 星盘数据
 */
export function astrolabeByLunarDate<T extends FunctionalAstrolabe>(
  lunarDateStr: string,
  timeIndex: number,
  gender: GenderName,
  isLeapMonth: boolean = false,
  fixLeap: boolean = true,
  language?: Language,
): T {
    throw new Error("STUB");
}

/**
 * 通过农历获取星盘信息
 *
 * @param lunarDateStr 农历日期【YYYY-M-D】，例如2000年七月十七则传入 2000-7-17
 * @param timeIndex 出生时辰序号【0~12】
 * @param gender 性别【男|女】
 * @param isLeapMonth 是否闰月【默认 false】，当实际月份没有闰月时该参数不生效
 * @param fixLeap 是否调整闰月情况【默认 true】，假入调整闰月，则闰月的前半个月算上个月，后半个月算下个月
 * @param language 输出语言
 * @returns 星盘数据
 */
export function byLunar<T extends FunctionalAstrolabe>(
  lunarDateStr: string,
  timeIndex: number,
  gender: GenderName,
  isLeapMonth: boolean = false,
  fixLeap: boolean = true,
  language?: Language,
) {
    throw new Error("STUB");
}

export function rearrangeAstrolable<T extends FunctionalAstrolabe>({
  from,
  astrolable,
  option,
}: {
  from: { heavenlyStem: HeavenlyStemName; earthlyBranch: EarthlyBranchName };
  astrolable: T;
  option: Option;
}) {
    throw new Error("STUB");
}

/**
 * 获取排盘信息。
 *
 * @param param0 排盘参数
 * @returns 星盘信息
 */
export function withOptions<T extends FunctionalAstrolabe>(option: Option): T {
    throw new Error("STUB");
}

/**
 * 通过公历获取十二生肖
 *
 * @version v1.2.1
 *
 * @param solarDateStr 阳历日期【YYYY-M-D】
 * @param language 输出语言，默认为中文
 * @returns 十二生肖
 */
export const getZodiacBySolarDate = (solarDateStr: string, language?: Language): string => {
    throw new Error("STUB");
};

/**
 * 通过阳历获取星座
 *
 * @version v1.2.1
 *
 * @param solarDateStr 阳历日期【YYYY-M-D】
 * @param language 输出语言，默认为中文
 * @returns 星座
 */
export const getSignBySolarDate = (solarDateStr: string, language?: Language): string => {
  language && setLanguage(language);

  return t(kot(getSign(solarDateStr)));
};

/**
 * 通过农历获取星座
 *
 * @version v1.2.1
 *
 * @param lunarDateStr 农历日期【YYYY-M-D】
 * @param isLeapMonth 是否闰月，如果该月没有闰月则此字段不生效
 * @param language 输出语言，默认为中文
 * @returns 星座
 */
export const getSignByLunarDate = (lunarDateStr: string, isLeapMonth?: boolean, language?: Language): string => {
    throw new Error("STUB");
};

/**
 * 通过阳历获取命宫主星
 *
 * @version v1.2.1
 *
 * @param solarDateStr 阳历日期【YYYY-M-D】
 * @param timeIndex 出生时辰序号【0~12】
 * @param fixLeap 是否调整闰月情况【默认 true】，假入调整闰月，则闰月的前半个月算上个月，后半个月算下个月
 * @param language 输出语言，默认为中文
 * @returns 命宫主星
 */
export const getMajorStarBySolarDate = (
  solarDateStr: string,
  timeIndex: number,
  fixLeap: boolean = true,
  language?: Language,
) => {
  language && setLanguage(language);

  const { soulIndex } = getSoulAndBody({ solarDate: solarDateStr, timeIndex, fixLeap });
  const majorStars = getMajorStar({ solarDate: solarDateStr, timeIndex, fixLeap });
  const stars = majorStars[soulIndex].filter((star) => { throw new Error("STUB"); });

  if (stars.length) {
    return stars.map((star) => { throw new Error("STUB"); }).join(',');
  }

  // 如果命宫为空宫，则借对宫主星
  return majorStars[fixIndex(soulIndex + 6)]
    .filter((star) => { throw new Error("STUB"); })
    .map((star) => { throw new Error("STUB"); })
    .join(',');
};

/**
 * 通过农历获取命宫主星
 *
 * @version v1.2.1
 *
 * @param lunarDateStr 农历日期【YYYY-M-D】，例如2000年七月十七则传入 2000-7-17
 * @param timeIndex 出生时辰序号【0~12】
 * @param isLeapMonth 是否闰月，如果该月没有闰月则此字段不生效
 * @param fixLeap 是否调整闰月情况【默认 true】，假入调整闰月，则闰月的前半个月算上个月，后半个月算下个月
 * @param language 输出语言，默认为中文
 * @returns 命宫主星
 */
export const getMajorStarByLunarDate = (
  lunarDateStr: string,
  timeIndex: number,
  isLeapMonth: boolean = false,
  fixLeap: boolean = true,
  language?: Language,
) => {
    throw new Error("STUB");
};
