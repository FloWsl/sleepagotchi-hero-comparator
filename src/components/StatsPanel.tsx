import React from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Coins, Zap } from 'lucide-react';
import { formatNumber, formatEfficiency } from '../lib/calculations';
import type { CalculatorState } from '../lib/types';

interface StatsPanelProps {
  stats: CalculatorState;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  const powerGainPercentage = stats.nextLevelPower 
    ? ((stats.nextLevelPower - stats.power) / stats.power * 100).toFixed(1)
    : null;

  const efficiencyChange = stats.powerPerGold - stats.previousPowerPerGold;
  const EfficiencyArrow = efficiencyChange >= 0 ? ArrowUpRight : ArrowDownRight;
  const efficiencyColor = efficiencyChange >= 0 ? 'text-green-400' : 'text-red-400';
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div className="bg-galaxy-900/50 backdrop-blur-sm rounded-xl p-6 border border-galaxy-700/50 shadow-neon">
        <div className="flex items-center gap-2 text-galaxy-300 mb-2">
          <Zap className="w-5 h-5" />
          <h3 className="font-semibold">Power Stats</h3>
        </div>
        <div className="space-y-3">
          <div>
            <div className="text-sm text-galaxy-400">Current Power</div>
            <div className="text-2xl font-bold text-galaxy-100">{formatNumber(stats.power)}</div>
          </div>
          {stats.nextLevelPower && (
            <div>
              <div className="text-sm text-galaxy-400">Next Level Power</div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold text-galaxy-100">{formatNumber(stats.nextLevelPower)}</span>
                <span className="text-sm text-green-400 flex items-center">
                  <ArrowUpRight className="w-4 h-4" />
                  {powerGainPercentage}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-galaxy-900/50 backdrop-blur-sm rounded-xl p-6 border border-galaxy-700/50 shadow-neon">
        <div className="flex items-center gap-2 text-galaxy-300 mb-2">
          <Coins className="w-5 h-5" />
          <h3 className="font-semibold">Cost Analysis</h3>
        </div>
        <div className="space-y-3">
          <div>
            <div className="text-sm text-galaxy-400">Total Cost</div>
            <div className="text-2xl font-bold text-galaxy-100">{formatNumber(stats.totalCost)}</div>
          </div>
          {stats.nextLevelCost && (
            <div>
              <div className="text-sm text-galaxy-400">Next Level Cost</div>
              <div className="text-xl font-semibold text-galaxy-100">{formatNumber(stats.nextLevelCost)}</div>
            </div>
          )}
        </div>
      </div>

      <div className="md:col-span-2 bg-galaxy-900/50 backdrop-blur-sm rounded-xl p-6 border border-galaxy-700/50 shadow-neon">
        <div className="flex items-center gap-2 text-galaxy-300 mb-2">
          <TrendingUp className="w-5 h-5" />
          <h3 className="font-semibold">Efficiency</h3>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <div className="text-sm text-galaxy-400">Power per Gold</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-galaxy-100">{formatEfficiency(stats.powerPerGold)}</span>
              {stats.previousPowerPerGold > 0 && (
                <span className={`text-sm flex items-center ${efficiencyColor}`}>
                  <EfficiencyArrow className="w-4 h-4" />
                  {Math.abs(efficiencyChange).toFixed(4)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}