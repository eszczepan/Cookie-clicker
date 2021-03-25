import { makeAutoObservable } from 'mobx';
import { clearPersist, stopPersist, startPersist } from 'mobx-persist-store';

import { persistStore } from './persistStore';

export class StatisticsStore {
  cookies: number = 0;
  totalCookies: number = 0;
  cookieClicks: number = 0;
  cookiesPerSecond: number = 0;
  level: number = 1;
  nextLevel: number = 10;
  buildings: number = 0;

  constructor() {
    makeAutoObservable(this);
    persistStore(
      this,
      [
        'cookies',
        'totalCookies',
        'cookieClicks',
        'cookiesPerSecond',
        'level',
        'nextLevel',
        'buildings',
      ],
      'StatisticsStore'
    );
  }

  cookieInc = () => {
    this.cookies = this.cookies + 1;
  };

  tCookieInc = () => {
    this.totalCookies = this.totalCookies + 1;
  };

  clearStore() {
    clearPersist(this);
    this.cookies = 0;
    this.totalCookies = 0;
    this.cookieClicks = 0;
    this.cookiesPerSecond = 0;
    this.level = 1;
    this.nextLevel = 10;
    this.buildings = 0;
  }

  stopPersist() {
    stopPersist(this);
  }

  startPersist() {
    startPersist(this);
  }
}
