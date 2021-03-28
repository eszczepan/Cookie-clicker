import { IBuilding } from 'typings/models';

export const cpsCounter = (buildings: IBuilding[]): number => {
  return buildings.reduce((cps, bObj) => {
    return (cps += bObj.cps * bObj.quantity);
  }, 0);
};
