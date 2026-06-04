import { getHeavenlyStemAndEarthlyBranchBySolarDate } from 'lunar-lite';
import { initStars } from '.';
import { t } from '../i18n';
import { fixLunarMonthIndex, getBrightness, getMutagen } from '../utils';
import FunctionalStar from './FunctionalStar';
import {
  getChangQuIndex,
  getHuoLingIndex,
  getKongJieIndex,
  getKuiYueIndex,
  getLuYangTuoMaIndex,
  getZuoYouIndex,
} from './location';
import { getConfig } from '../astro';

/**
 * 安14辅星，寅宫下标为0，若下标对应的数组为空数组则表示没有星耀
 *
 * @param solarDateStr 阳历日期字符串
 * @param timeIndex 时辰索引【0～12】
 * @param fixLeap 是否修复闰月，假如当月不是闰月则不生效
 * @returns 14辅星
 */
export const getMinorStar = (solarDateStr: string, timeIndex: number, fixLeap?: boolean) => {
    throw new Error("STUB");
};
