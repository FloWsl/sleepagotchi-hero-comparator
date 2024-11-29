export type Rarity = 0 | 1 | 2;
export type Stars = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type Level = number;

export interface HeroStats {
    rarity: Rarity;
    stars: Stars;
    level: Level;
    power: number;
    totalCost: number;
    nextLevelCost: number | null;
    nextLevelPower: number | null;
}

export interface CalculatorState extends HeroStats {
    isMaxLevel: boolean;
    powerPerGold: number;
    previousPowerPerGold: number;
}