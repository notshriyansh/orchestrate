import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#0b1220] text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(#1f2a44_1px,transparent_1px)] 
                      bg-size-[24px_24px] opacity-30"
      />

      <div className="relative z-10 flex min-h-screen">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center px-16 w-1/2">
          <h1 className="text-4xl font-semibold leading-tight mb-6">
            Design. Orchestrate. Execute.
          </h1>

          <p className="text-slate-400 max-w-md">
            Build visual workflows, model system design architectures, and debug
            distributed systems — all on a live canvas.
          </p>
        </div>

        <div className="flex items-center justify-center w-full lg:w-1/2 px-6">
          <div
            className="w-full max-w-md p-10 
                          bg-slate-900/70 backdrop-blur-xl
                          border border-white/10
                          rounded-2xl shadow-xl"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
