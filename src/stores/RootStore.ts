import { createContext, useContext } from 'react';
import { StatisticsStore } from './StatisticsStore';

class RootStore {
  statistic = new StatisticsStore();
}

const StoresContext = createContext(new RootStore());

export const useStores = () => useContext(StoresContext);
