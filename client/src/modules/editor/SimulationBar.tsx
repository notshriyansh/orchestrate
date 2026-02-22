export default function SimulationBar({ progress, isRunning }: any) {
  return (
    <div className="h-16 border-t border-white/10 bg-slate-950 px-8 flex flex-col justify-center">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-300">
          {isRunning ? "Executing Workflow..." : "Idle"}
        </span>
        <span className="text-blue-400 font-medium">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            isRunning
              ? "bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 animate-pulse"
              : "bg-green-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
