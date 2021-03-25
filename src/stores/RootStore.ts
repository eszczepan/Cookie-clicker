import { createContext, useContext } from 'react';
import { StatisticsStore } from './StatisticsStore';
import { AchievementsStore } from './AchievementsStore';

class RootStore {
  statistic = new StatisticsStore();
  achievement = new AchievementsStore();
}

const StoresContext = createContext(new RootStore());

export const useStores = () => useContext(StoresContext);
