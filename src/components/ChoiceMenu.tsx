import React from 'react';
import { SceneChoice } from '../types';

interface ChoiceMenuProps {
  prompt?: string;
  choices: SceneChoice[];
  onSelectChoice: (choice: SceneChoice) => void;
}

export const ChoiceMenu: React.FC<ChoiceMenuProps> = ({
  prompt,
  choices,
  onSelectChoice,
}) => {
  return (
    <div
      id="choice-menu-overlay"
      className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 select-none animate-fadeIn"
    >
      <div className="w-full max-w-xl flex flex-col items-center space-y-4">
        {prompt && (
          <div className="bg-[#0b1410]/90 border border-[#213b2c] px-6 py-3 rounded-xl mb-2 text-center shadow-lg">
            <h3 className="text-emerald-300 font-semibold text-base md:text-lg tracking-wide">
              {prompt}
            </h3>
          </div>
        )}

        <div className="w-full space-y-3">
          {choices.map((choice) => (
            <button
              key={choice.id}
              id={`choice-${choice.id}`}
              onClick={() => onSelectChoice(choice)}
              className="w-full min-h-[64px] py-4 px-6 rounded-xl bg-[#0e1a14]/95 hover:bg-[#162920] active:scale-[0.98] border border-[#2c4e3b] hover:border-emerald-400 text-left transition-all duration-150 shadow-xl group flex items-center justify-between cursor-pointer"
            >
              <span className="text-lg md:text-xl font-bold text-slate-100 group-hover:text-emerald-200">
                {choice.text}
              </span>
              <span className="text-emerald-400 font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity ml-4 shrink-0">
                SELECT →
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
