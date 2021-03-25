import { makeAutoObservable } from 'mobx';
import { clearPersist, stopPersist, startPersist } from 'mobx-persist-store';

import { persistStore } from './persistStore';
import { IAchievement } from 'typings/models';

export class AchievementsStore {
  achievements: IAchievement[] = [];

  constructor() {
    makeAutoObservable(this);
    persistStore(this, ['achievements'], 'AchievementsStore');
  }

  add = (achievement: IAchievement) => {
    this.achievements.push(achievement);
  };

  clearStore() {
    clearPersist(this);
    this.achievements = [];
  }

  stopPersist() {
    stopPersist(this);
  }

  startPersist() {
    startPersist(this);
  }
}
