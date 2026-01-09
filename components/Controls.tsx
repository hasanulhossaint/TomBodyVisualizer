
import React from 'react';
import { BodyStats, Gender, UnitSystem, ViewMode } from '../types';

interface ControlsProps {
  stats: BodyStats;
  onChange: (stats: BodyStats) => void;
  units: UnitSystem;
  onUnitChange: (units: UnitSystem) => void;
  onCalculate: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const Controls: React.FC<ControlsProps> = ({ stats, onChange, units, onUnitChange, onCalculate, viewMode, onViewModeChange }) => {
  const handleValueChange = (key: keyof BodyStats, value: any) => {
    let finalValue = value;
    
    // Only parse as float for numeric fields
    if (key === 'height' || key === 'weight' || key === 'age') {
      finalValue = typeof value === 'string' ? parseFloat(value) : value;
      if (isNaN(finalValue)) finalValue = 0;
    }
    
    onChange({ ...stats, [key]: finalValue });
  };

  const btnBaseClass = "py-4 px-4 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:scale-95";

  return (
    <div className="space-y-8 p-6 md:p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Parameters</h2>
        <div className="flex bg-slate-100 p-1 rounded-2xl w-full sm:w-auto self-stretch sm:self-auto">
          <button 
            onClick={() => onUnitChange(UnitSystem.METRIC)}
            className={`flex-1 px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${units === UnitSystem.METRIC ? 'bg-white shadow-md text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Metric
          </button>
          <button 
             onClick={() => onUnitChange(UnitSystem.IMPERIAL)}
             className={`flex-1 px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${units === UnitSystem.IMPERIAL ? 'bg-white shadow-md text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Imperial
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Projection Mode */}
        <div className="space-y-4">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Projection Mode</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onViewModeChange(ViewMode.FRONT)}
              className={`${btnBaseClass} ${viewMode === ViewMode.FRONT ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-lg shadow-blue-100' : 'border-slate-50 text-slate-400 bg-slate-50 hover:border-slate-200'}`}
            >
              Anterior
            </button>
            <button
              onClick={() => onViewModeChange(ViewMode.SIDE)}
              className={`${btnBaseClass} ${viewMode === ViewMode.SIDE ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-lg shadow-blue-100' : 'border-slate-50 text-slate-400 bg-slate-50 hover:border-slate-200'}`}
            >
              Sagittal
            </button>
          </div>
        </div>

        {/* Gender Profile */}
        <div className="space-y-4">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Biological Profile</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleValueChange('gender', Gender.MALE)}
              className={`${btnBaseClass} ${stats.gender === Gender.MALE ? 'border-slate-900 bg-slate-900 text-white shadow-xl' : 'border-slate-50 text-slate-400 bg-slate-50 hover:border-slate-200'}`}
            >
              <span className="text-lg">♂</span> Male
            </button>
            <button
              onClick={() => handleValueChange('gender', Gender.FEMALE)}
              className={`${btnBaseClass} ${stats.gender === Gender.FEMALE ? 'border-slate-900 bg-slate-900 text-white shadow-xl' : 'border-slate-50 text-slate-400 bg-slate-50 hover:border-slate-200'}`}
            >
              <span className="text-lg">♀</span> Female
            </button>
          </div>
        </div>

        {/* Height Input */}
        <div className="space-y-5 bg-slate-50/50 p-5 rounded-3xl border border-slate-50">
          <div className="flex justify-between items-end">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Height</label>
            <div className="flex items-baseline gap-1">
              <input 
                type="number" value={stats.height}
                onChange={(e) => handleValueChange('height', e.target.value)}
                className="w-20 text-right font-black text-3xl text-slate-900 bg-transparent focus:outline-none focus:ring-0 appearance-none"
              />
              <span className="text-[10px] font-black text-slate-300 uppercase">{units === UnitSystem.METRIC ? 'cm' : 'in'}</span>
            </div>
          </div>
          <input
            type="range" min="100" max="230" value={stats.height}
            onChange={(e) => handleValueChange('height', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600 touch-none"
          />
        </div>

        {/* Weight Input */}
        <div className="space-y-5 bg-slate-50/50 p-5 rounded-3xl border border-slate-50">
          <div className="flex justify-between items-end">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Weight</label>
            <div className="flex items-baseline gap-1">
              <input 
                type="number" step="0.1" value={stats.weight}
                onChange={(e) => handleValueChange('weight', e.target.value)}
                className="w-24 text-right font-black text-3xl text-slate-900 bg-transparent focus:outline-none focus:ring-0"
              />
              <span className="text-[10px] font-black text-slate-300 uppercase">{units === UnitSystem.METRIC ? 'kg' : 'lb'}</span>
            </div>
          </div>
          <input
            type="range" min="30" max="250" value={stats.weight}
            onChange={(e) => handleValueChange('weight', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600 touch-none"
          />
        </div>

        {/* Age Input */}
        <div className="space-y-5 bg-slate-50/50 p-5 rounded-3xl border border-slate-50">
          <div className="flex justify-between items-end">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Age</label>
            <div className="flex items-baseline gap-1">
              <span className="font-black text-3xl text-slate-900">{stats.age}</span>
              <span className="text-[10px] font-black text-slate-300 uppercase">Yrs</span>
            </div>
          </div>
          <input
            type="range" min="10" max="95" value={stats.age}
            onChange={(e) => handleValueChange('age', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600 touch-none"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={onCalculate}
          className="group relative w-full py-6 bg-slate-900 hover:bg-black text-white rounded-[2rem] transition-all shadow-2xl active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
          <div className="relative z-10 flex items-center justify-center gap-4">
            <span className="font-black uppercase text-xs tracking-[0.3em]">Update Projection</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Controls;
