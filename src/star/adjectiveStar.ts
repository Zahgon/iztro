import { getHeavenlyStemAndEarthlyBranchBySolarDate } from 'lunar-lite';
import { getYearly12, initStars } from '.';
import { kot, t } from '../i18n';
import FunctionalStar from './FunctionalStar';
import {
  getDailyStarIndex,
  getLuanXiIndex,
  getMonthlyStarIndex,
  getTimelyStarIndex,
  getYearlyStarIndex,
} from './location';
import { getConfig } from '../astro';
import { AstrolabeParam } from '../data/types';

/**
 * 安杂耀
 *
 * @param {AstrolabeParam} param - 通用排盘参数参数
 * @returns 38杂耀
 */
export const getAdjectiveStar = (param: AstrolabeParam) => {
    throw new Error("STUB");
};
