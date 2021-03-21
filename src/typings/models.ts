export interface IBuilding {
  title: string;
  description: string;
  quantity: number;
  icon: string;
  baseCost: number;
  cost: number;
  baseCps: number;
  cps: number;
  upgrade: number;
}

export interface IStatistics {
  cookies: number;
  totalCookies: number;
  cookieClicks: number;
  cookiesPerSecond: number;
  level: number;
  nextLevel: number;
  buildings: number;
}
