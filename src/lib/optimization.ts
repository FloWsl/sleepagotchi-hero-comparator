import { calculatePower } from './power';
import { calculateTotalSpent } from './costs';
import type { Rarity, Stars } from './types';

export function findOptimalLevel(availableGold: number, rarity: Rarity, stars: Stars): number {
    let bestLevel = 1;
    let bestEfficiency = 0;
    
    for (let level = 1; level <= 40; level++) {
        const totalCost = calculateTotalSpent(level, rarity, stars);
        if (totalCost <= availableGold) {
            const power = calculatePower(rarity, level, stars);
            const efficiency = power / totalCost;
            if (efficiency > bestEfficiency) {
                bestLevel = level;
                bestEfficiency = efficiency;
            }
        }
    }
    return bestLevel;
}