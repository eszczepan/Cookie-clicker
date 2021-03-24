import { makeAutoObservable } from 'mobx';
import { clearPersist, isSynchronized } from 'mobx-persist-store';

import { statistics } from 'data/statistics';
import { persistStore } from './persistStore';

class StatisticsStore {
  progress = statistics;

  constructor() {
    makeAutoObservable(this);
    persistStore(this, ['progress'], 'StatisticsStore');
  }

  clearStore = () => {
    clearPersist(this);
  };

  get isSynchronized() {
    return isSynchronized(this);
  }
}

export default new StatisticsStore();

// export default persistence({
//   name: 'StatisticsStore',
//   properties: ['progress'],
//   adapter: new StorageAdapter({
//     read: async (name) => {
//       const data = window.localStorage.getItem(name);
//       return data ? JSON.parse(data) : undefined;
//     },
//     write: async (name, content) => {
//       window.localStorage.setItem(name, JSON.stringify(content));
//     },
//   }),
//   reactionOptions: {
//     // optional
//     delay: 200,
//   },
// })(new StatisticsStore());
