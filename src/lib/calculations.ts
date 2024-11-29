import { BASE_POWER, STAR_MULTIPLIERS, GAME_PHASES } from './constants';
import { calculateLevelPowerMultiplier, calculateCostMultiplier, getNextPhaseLevel } from './growth';
import type { Rarity, Stars, Level, GamePhase } from './types';

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

export function calculateLevelCost(rarity: Rarity, level: Level, stars: Stars): number {
    const baseCost = 150 * calculateCostMultiplier(level);
    return Math.round(baseCost * STAR_MULTIPLIERS[stars]);
}

export function calculateTotalCost(rarity: Rarity, level: Level, stars: Stars): number {
    let total = 0;
    for (let i = 1; i <= level; i++) {
        total += calculateLevelCost(rarity, i, stars);
    }
    return Math.round(total);
}

export function getGamePhase(level: Level): GamePhase {
    if (level <= GAME_PHASES.EARLY.max) return 'EARLY';
    if (level <= GAME_PHASES.MID.max) return 'MID';
    if (level <= GAME_PHASES.LATE.max) return 'LATE';
    return 'EXTENDED';
}

export function calculatePhaseEfficiency(level: Level, powerPerGold: number): number {
    const phase = getGamePhase(level);
    return powerPerGold * GAME_PHASES[phase].multiplier;
}

export function getNextValidLevel(level: Level): number | null {
    if (level >= 40) return null;
    return Math.min(level + 1, 40);
}

export function formatNumber(num: number): string {
    return new Intl.NumberFormat().format(Math.round(num));
}

export function formatEfficiency(num: number): string {
    return num.toFixed(4);
}

export function getEfficiencyRating(efficiency: number): 'low' | 'medium' | 'high' {
    if (efficiency > 2.0) return 'high';
    if (efficiency > 1.0) return 'medium';
    return 'low';
}

export function findOptimalLevel(availableGold: number, rarity: Rarity, stars: Stars): number {
    let bestLevel = 1;
    let bestEfficiency = 0;
    
    for (let level = 1; level <= 40; level++) {
        const totalCost = calculateTotalCost(rarity, level, stars);
        if (totalCost <= availableGold) {
            const power = calculatePower(rarity, level, stars);
            const efficiency = calculatePhaseEfficiency(level, power / totalCost);
            if (efficiency > bestEfficiency) {
                bestLevel = level;
                bestEfficiency = efficiency;
            }
        }
    }
    return bestLevel;
}