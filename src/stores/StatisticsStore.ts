import { makeAutoObservable } from 'mobx';
import { clearPersist, stopPersist, startPersist } from 'mobx-persist-store';

import { persistStore } from './persistStore';

export class StatisticsStore {
  cookies = 0;
  totalCookies = 0;
  cookieClicks = 0;
  cookiesPerSecond = 0;
  level = 1;
  nextLevel = 10;
  buildings = 0;

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
