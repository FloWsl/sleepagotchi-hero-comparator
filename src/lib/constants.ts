// Base power values for each rarity
export const BASE_POWER = {
    0: 28,  // Common
    1: 34,  // Rare
    2: 41   // Legendary
} as const;

// Star multipliers (verified and extrapolated)
export const STAR_MULTIPLIERS = {
    1: 1.0000,  // Base
    2: 1.0838,  // Verified
    3: 1.1806,  // Verified
    4: 1.2614,  // Verified
    5: 1.3422,  // Extrapolated
    6: 1.4230,  // Extrapolated
    7: 1.5038,  // Extrapolated
    8: 1.5846,  // Extrapolated
    9: 1.6654,  // Extrapolated
    10: 1.7462  // Extrapolated
} as const;

export const RARITY_NAMES = {
    0: 'Common',
    1: 'Rare',
    2: 'Legendary'
} as const;

// Power checkpoints for verification (Rarity 2, 1★)
export const POWER_CHECKPOINTS = {
    1: 41,      // Base
    4: 440,     // Early game
    8: 2640,    // Mid game
    16: 10560,  // Late game
    20: 16346,  // Extended
    30: 36378,  // Extended
    40: 67096   // Maximum
} as const;

// Phase definitions for efficiency calculations
export const GAME_PHASES = {
    EARLY: { max: 4, multiplier: 1.2 },
    MID: { max: 10, multiplier: 1.1 },
    LATE: { max: 16, multiplier: 1.0 },
    EXTENDED: { max: 40, multiplier: 0.9 }
} as const;