// Cost calculation system
export const BASE_LEVEL_COSTS = {
  1: 150,
  2: 252,
  3: 342,
  4: 424,
  5: 502,
  6: 575,
  7: 646,
  8: 714,
  10: 844,
  16: 1200
} as const;

export function findNearestKnownLevels(level: number): [number, number] {
    const knownLevels = Object.keys(BASE_LEVEL_COSTS).map(Number).sort((a, b) => a - b);
    
    let lowerLevel = knownLevels[0];
    let upperLevel = knownLevels[knownLevels.length - 1];
    
    for (let i = 0; i < knownLevels.length - 1; i++) {
        if (level >= knownLevels[i] && level < knownLevels[i + 1]) {
            lowerLevel = knownLevels[i];
            upperLevel = knownLevels[i + 1];
            break;
        }
    }
    
    return [lowerLevel, upperLevel];
}

export function interpolateCost(level: number, lowerLevel: number, upperLevel: number): number {
    const lowerCost = BASE_LEVEL_COSTS[lowerLevel as keyof typeof BASE_LEVEL_COSTS];
    const upperCost = BASE_LEVEL_COSTS[upperLevel as keyof typeof BASE_LEVEL_COSTS];
    
    const levelDiff = upperLevel - lowerLevel;
    const costDiff = upperCost - lowerCost;
    const costPerLevel = costDiff / levelDiff;
    
    return Math.round(lowerCost + (costPerLevel * (level - lowerLevel)));
}

export function getNextLevelCost(currentLevel: number, rarity: number, stars: number): number {
    // Get base cost for next level
    const nextLevel = currentLevel + 1;
    let baseCost = BASE_LEVEL_COSTS[nextLevel as keyof typeof BASE_LEVEL_COSTS];
    
    // Handle missing level costs through interpolation
    if (!baseCost) {
        const [lowerLevel, upperLevel] = findNearestKnownLevels(nextLevel);
        baseCost = interpolateCost(nextLevel, lowerLevel, upperLevel);
    }

    // Apply rarity multiplier
    const rarityMultiplier = {
        0: 1.0,
        1: 1.1,
        2: 1.2
    }[rarity];

    // Apply star multiplier
    const starMultiplier = 1 + ((stars - 1) * 0.15);  // 15% increase per star

    return Math.round(baseCost * rarityMultiplier * starMultiplier);
}

export function calculateTotalSpent(currentLevel: number, rarity: number, stars: number): number {
    let totalCost = 0;
    
    for (let level = 1; level < currentLevel; level++) {
        totalCost += getNextLevelCost(level, rarity, stars);
    }
    
    return totalCost;
}