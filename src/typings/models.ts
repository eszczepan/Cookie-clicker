export interface IBuilding {
  title: string;
  description: string;
  quantity: number;
  icon: string;
  icon64: string;
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

export interface IAchievement {
  id: number;
  icon: string;
  title: string;
  description: string;
  condition: number;
}
