import { makeAutoObservable } from 'mobx';
import { clearPersist, stopPersist, startPersist } from 'mobx-persist-store';

import { persistStore } from './persistStore';
import { IAchievement } from 'typings/models';
import { clickingAchievements } from 'api/clickingAchievements';
import { cookiesAchievements } from 'api/cookiesAchievements';
import { cpsAchievements } from 'api/cpsAchievements';

export class AchievementsStore {
  achievements: IAchievement[] = [];
  clicking = clickingAchievements;
  cookies = cookiesAchievements;
  cps = cpsAchievements;
  current: IAchievement[] = [];

  constructor() {
    makeAutoObservable(this);
    persistStore(
      this,
      ['achievements', 'clicking', 'cookies', 'cps', 'current'],
      'AchievementsStore'
    );
  }

  add(newAchievement: IAchievement) {
    this.achievements.push(newAchievement);
  }

  updateCookies(newAchievement: IAchievement) {
    this.cookies = this.cookies.filter((obj) => newAchievement.id !== obj.id);
    this.current.push(newAchievement);
  }

  updateClicks(newAchievement: IAchievement) {
    this.clicking = this.clicking.filter((obj) => newAchievement.id !== obj.id);
    this.current.push(newAchievement);
  }

  updateCps(newAchievement: IAchievement) {
    this.cps = this.cps.filter((obj) => newAchievement.id !== obj.id);
    this.current.push(newAchievement);
  }

  removeCurrent(id: number) {
    this.current = this.current.filter((obj) => id !== obj.id);
  }

  clearStore() {
    clearPersist(this);
    this.achievements = [];
    this.clicking = clickingAchievements;
    this.cookies = cookiesAchievements;
    this.cps = cpsAchievements;
    this.current = [];
  }

  stopPersist() {
    stopPersist(this);
  }

  startPersist() {
    startPersist(this);
  }
}
