import React from 'react';
import { Check } from 'lucide-react';

const STEPS = [
  { id: 1, name: 'Personal Details' },
  { id: 2, name: 'Academic Details' },
  { id: 3, name: 'Exam Details' },
  { id: 4, name: 'Documents' },
  { id: 5, name: 'Review Application' }
];

export default function RegistrationStepper({ currentStep, setStep }) {
  return (
    <div className="w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
      <div className="flex items-center justify-between max-w-4xl mx-auto overflow-x-auto py-2">
        {STEPS.map((step, idx) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <React.Fragment key={step.id}>
              <div
                onClick={() => isCompleted && setStep(step.id)}
                className={`flex items-center gap-2 shrink-0 cursor-pointer ${
                  isCompleted ? 'hover:opacity-80' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                      : 'bg-slate-100 text-slate-400 border border-slate-300'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <span
                  className={`text-xs font-semibold hidden sm:inline ${
                    isCurrent ? 'text-blue-900 font-bold' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 min-w-[20px] mx-2 ${
                    step.id < currentStep ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
