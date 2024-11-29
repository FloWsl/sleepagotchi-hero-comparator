import { BASE_POWER, STAR_MULTIPLIERS } from './constants';
import { calculateLevelPowerMultiplier } from './growth';
import type { Rarity, Stars, Level } from './types';

export function calculatePower(rarity: Rarity, level: Level, stars: Stars): number {
    let power = BASE_POWER[rarity];
    let currentLevel = 1;
    
    while (currentLevel < level) {
        const nextPhaseLevel = getNextPhaseLevel(currentLevel);
        const phaseEndLevel = Math.min(nextPhaseLevel, level);
        power *= calculateLevelPowerMultiplier(currentLevel, phaseEndLevel);
        currentLevel = phaseEndLevel;
    }
    
    power *= STAR_MULTIPLIERS[stars];
    return Math.round(power);
}

function getNextPhaseLevel(currentLevel: number): number {
    if (currentLevel < 4) return 4;
    if (currentLevel < 10) return 10;
    if (currentLevel < 16) return 16;
    return Math.min(currentLevel + 1, 40);
}