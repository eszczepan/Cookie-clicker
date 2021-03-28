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
    this.cookies = this.cookies + this.cookiesPerSecond / 10;
    this.totalCookies = this.totalCookies + this.cookiesPerSecond / 10;
  };

  levelInc(): void {
    this.level++;
    this.nextLevel = this.nextLevel * 2;
  }

  cookieClick(): void {
    this.cookies++;
    this.totalCookies++;
    this.cookieClicks++;
  }

  purchase(cpsProgress: number, cost: number): void {
    this.cookies = this.cookies - cost;
    this.buildings++;
    this.cookiesPerSecond = cpsProgress;
    this.buildings++;
  }

  clearStore(): void {
    clearPersist(this);
    this.cookies = 0;
    this.totalCookies = 0;
    this.cookieClicks = 0;
    this.cookiesPerSecond = 0;
    this.level = 1;
    this.nextLevel = 10;
    this.buildings = 0;
  }

  stopPersist(): void {
    stopPersist(this);
  }

  startPersist(): void {
    startPersist(this);
  }
}
