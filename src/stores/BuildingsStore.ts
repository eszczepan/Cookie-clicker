import { makeAutoObservable } from 'mobx';
import { clearPersist, stopPersist, startPersist } from 'mobx-persist-store';

import { persistStore } from './persistStore';
import { IBuilding } from 'typings/models';
import { buildings } from 'data/buildings';

export class BuildingsStore {
  buildings = buildings;

  constructor() {
    makeAutoObservable(this);
    persistStore(this, ['buildings'], 'BuildingsStore');
  }

  purchase = (updatedBuildings: IBuilding[]) => {
    this.buildings = updatedBuildings;
  };

  clearStore() {
    clearPersist(this);
    this.buildings = buildings;
  }

  stopPersist() {
    stopPersist(this);
  }

  startPersist() {
    startPersist(this);
  }
}
