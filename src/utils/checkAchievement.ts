import { IAchievement } from 'typings/models';

export const checkAchievement = (progress: number, achievementType: IAchievement[]) => {
  for (let i = 0; i < achievementType.length; i++) {
    const current = achievementType[i];
    if (progress >= current.condition) return current;
  }
  return null;
};
