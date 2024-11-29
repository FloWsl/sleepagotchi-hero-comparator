import React from 'react';
import { Star, Crown } from 'lucide-react';
import { RARITY_NAMES } from '../lib/constants';
import type { Rarity, Stars, Level } from '../lib/types';

interface HeroFormProps {
  rarity: Rarity;
  stars: Stars;
  level: Level;
  onChange: (values: { rarity?: Rarity; stars?: Stars; level?: Level }) => void;
}

export function HeroForm({ rarity, stars, level, onChange }: HeroFormProps) {
  return (
    <div className="bg-galaxy-900/50 backdrop-blur-sm rounded-xl p-6 border border-galaxy-700/50 shadow-neon">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-galaxy-100 mb-2">Rarity</label>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((r) => (
              <button
                key={r}
                onClick={() => onChange({ rarity: r as Rarity })}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                  rarity === r
                    ? 'bg-galaxy-700/50 border-galaxy-300 text-galaxy-100 shadow-neon'
                    : 'border-galaxy-700/50 text-galaxy-300 hover:bg-galaxy-800/50'
                }`}
              >
                <Crown className={`w-4 h-4 ${rarity === r ? 'text-galaxy-300' : 'text-galaxy-400'}`} />
                <span className="text-sm font-medium">{RARITY_NAMES[r as Rarity]}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-galaxy-100 mb-2">Stars</label>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((s) => (
              <button
                key={s}
                onClick={() => onChange({ stars: s as Stars })}
                className={`flex items-center justify-center gap-1 px-3 py-2 rounded-lg border transition-all duration-200 ${
                  stars === s
                    ? 'bg-galaxy-700/50 border-galaxy-300 text-galaxy-100 shadow-neon'
                    : 'border-galaxy-700/50 text-galaxy-300 hover:bg-galaxy-800/50'
                }`}
              >
                <Star
                  className={`w-4 h-4 ${stars === s ? 'text-galaxy-300' : 'text-galaxy-400'}`}
                  fill={stars === s ? 'currentColor' : 'none'}
                />
                <span className="text-sm font-medium">{s}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-galaxy-100 mb-2">Level</label>
          <input
            type="number"
            min="1"
            max="40"
            value={level}
            onChange={(e) => onChange({ level: Math.min(40, Math.max(1, parseInt(e.target.value) || 1)) })}
            className="w-full px-3 py-2 bg-galaxy-800/50 border border-galaxy-700/50 rounded-lg text-galaxy-100 focus:ring-2 focus:ring-galaxy-300 focus:border-galaxy-300"
          />
          <div className="mt-2 text-sm text-galaxy-400">
            Level range: 1-40
          </div>
        </div>
      </div>
    </div>
  );
}