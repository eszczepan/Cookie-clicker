import { makeAutoObservable } from 'mobx';
import { clearPersist, stopPersist, startPersist } from 'mobx-persist-store';

import { persistStore } from './persistStore';
import { IBuilding } from 'typings/models';
import { buildings } from 'data/buildings';

export class BuildingsStore {
  cursor = buildings[1];
  grandma = buildings[2];
  farm = buildings[3];
  mine = buildings[4];
  factory = buildings[5];
  bank = buildings[6];
  temple = buildings[7];
  wizardTower = buildings[8];
  shipment = buildings[9];
  alchemyLab = buildings[10];

  constructor() {
    makeAutoObservable(this);
    persistStore(
      this,
      [
        'cursor',
        'grandma',
        'farm',
        'mine',
        'factory',
        'bank',
        'temple',
        'wizardTower',
        'shipment',
        'alchemyLab',
      ],
      'BuildingsStore'
    );
  }

  purchase = (index: number) => {
    this.cursor = {
      title: 'Cursor',
      description: 'Autoclicks once every 10 seconds.',
      quantity: 1,
      icon: 'CursorIcon',
      icon64: 'Cursor64',
      baseCost: 15,
      cost: 15,
      baseCps: 0.1,
      cps: 0.1,
      upgrade: 1,
    };
  };

  clearStore() {
    clearPersist(this);
  }

  stopPersist() {
    stopPersist(this);
  }

  startPersist() {
    startPersist(this);
  }
}
