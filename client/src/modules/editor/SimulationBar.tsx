export default function SimulationBar({ progress, isRunning }: any) {
  return (
    <div className="h-14 border-t border-white/10 bg-slate-900 px-6 flex flex-col justify-center">
      <div className="flex justify-between text-xs text-slate-400 mb-2">
        <span>{isRunning ? "Executing workflow..." : "Idle"}</span>
        <span>{Math.round(progress)}%</span>
      </div>

      <div className="w-full bg-slate-800 h-2 rounded overflow-hidden relative">
        <div
          className={`h-full transition-all duration-300 ${
            isRunning
              ? "bg-linear-to-r from-blue-500 to-indigo-500 animate-pulse"
              : "bg-green-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
