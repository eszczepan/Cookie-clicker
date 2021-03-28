import { createContext, useContext } from 'react';
import { StatisticsStore } from './StatisticsStore';
import { AchievementsStore } from './AchievementsStore';
import { BuildingsStore } from './BuildingsStore';

class RootStore {
  statistics = new StatisticsStore();
  achievements = new AchievementsStore();
  buildings = new BuildingsStore();
}

const StoresContext = createContext(new RootStore());

export const useStores = () => useContext(StoresContext);
