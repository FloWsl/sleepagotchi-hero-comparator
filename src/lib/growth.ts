// Growth calculation systems
export function calculateLevelPowerMultiplier(fromLevel: number, toLevel: number): number {
    if (toLevel <= 4) {
        // Early game growth (levels 1-4)
        const earlyMultipliers = {
            "1-2": 4.00,
            "2-3": 2.25,
            "3-4": 1.78
        };
        return earlyMultipliers[`${fromLevel}-${toLevel}`] || 1;
    } else if (toLevel <= 10) {
        // Mid game growth (levels 5-10)
        return Math.pow(1.35, toLevel - fromLevel);
    } else if (toLevel <= 16) {
        // Late game growth (levels 11-16)
        return Math.pow(1.25, toLevel - fromLevel);
    } else {
        // Extended game growth (levels 17-40)
        let multiplier = 1;
        for(let level = fromLevel; level < toLevel; level++) {
            const levelFactor = Math.log(level - 15) / Math.log(2);
            const growthRate = 1.15 - (0.02 * levelFactor);
            multiplier *= growthRate;
        }
        return multiplier;
    }
}

export function calculateCostMultiplier(level: number): number {
    if (level <= 16) {
        const r = 0.5188 * Math.exp(-0.2149 * level);
        return Math.exp(r);
    } else {
        const levelFactor = Math.log(level - 15) / Math.log(2);
        return 1.05 - (0.005 * levelFactor);
    }
}

export function calculateStarMultiplier(stars: number): number {
    const BASE_INCREASE = 0.0808;
    return 1 + (stars - 1) * BASE_INCREASE;
}

export function getNextPhaseLevel(currentLevel: number): number {
    if (currentLevel < 4) return 4;
    if (currentLevel < 10) return 10;
    if (currentLevel < 16) return 16;
    return Math.min(currentLevel + 1, 40);
}