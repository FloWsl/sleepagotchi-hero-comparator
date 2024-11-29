import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { HeroForm } from './components/HeroForm';
import { StatsPanel } from './components/StatsPanel';
import { calculatePower } from './lib/power';
import { getNextLevelCost, calculateTotalSpent } from './lib/costs';
import type { CalculatorState, Rarity, Stars, Level } from './lib/types';

export default function App() {
  const [state, setState] = useState<CalculatorState>({
    rarity: 0,
    stars: 1,
    level: 1,
    power: calculatePower(0, 1, 1),
    totalCost: calculateTotalSpent(1, 0, 1),
    nextLevelCost: getNextLevelCost(1, 0, 1),
    nextLevelPower: calculatePower(0, 2, 1),
    isMaxLevel: false,
    powerPerGold: calculatePower(0, 1, 1) / calculateTotalSpent(1, 0, 1),
    previousPowerPerGold: 0
  });

  const handleChange = (values: { rarity?: Rarity; stars?: Stars; level?: Level }) => {
    const newState = {
      ...state,
      ...values
    };

    const power = calculatePower(newState.rarity, newState.level, newState.stars);
    const totalCost = calculateTotalSpent(newState.level, newState.rarity, newState.stars);
    const nextLevel = newState.level < 40 ? newState.level + 1 : null;
    const powerPerGold = power / totalCost;
    
    setState({
      ...newState,
      power,
      totalCost,
      nextLevelCost: nextLevel ? getNextLevelCost(newState.level, newState.rarity, newState.stars) : null,
      nextLevelPower: nextLevel ? calculatePower(newState.rarity, nextLevel, newState.stars) : null,
      isMaxLevel: !nextLevel,
      powerPerGold,
      previousPowerPerGold: state.powerPerGold
    });
  };

  return (
    <div className="min-h-screen bg-galaxy-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-galaxy-900 via-galaxy-950 to-galaxy-950">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Calculator className="w-8 h-8 text-galaxy-300" />
          <h1 className="text-3xl font-bold text-white">Hero Calculator</h1>
        </div>

        <HeroForm
          rarity={state.rarity}
          stars={state.stars}
          level={state.level}
          onChange={handleChange}
        />

        <StatsPanel stats={state} />
      </div>
    </div>
  );
}