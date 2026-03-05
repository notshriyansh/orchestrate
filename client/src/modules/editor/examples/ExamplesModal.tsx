import { WORKFLOW_EXAMPLES } from "./workflowExamples";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ExamplesModal({ onClose, loadExample }: any) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: any) => {
    if (!modalRef.current?.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    const esc = (e: any) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, []);

  return (
    <div
      onMouseDown={handleOutsideClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        ref={modalRef}
        className="w-230 max-h-[85vh] overflow-y-auto rounded-2xl bg-slate-950 border border-white/10 shadow-2xl p-8"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Workflow Templates
            </h2>

            <p className="text-sm text-white/50">
              Load a prebuilt architecture
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {WORKFLOW_EXAMPLES.map((example) => {
            return (
              <div
                key={example.id}
                className="group border border-white/10 rounded-xl p-6 bg-slate-900/50 hover:border-blue-500/50 transition"
              >
                <h3 className="text-lg font-semibold text-white mb-1">
                  {example.name}
                </h3>

                <p className="text-sm text-white/50 mb-5">
                  {example.description}
                </p>

                <div className="flex items-center gap-2 mb-5">
                  {example.nodes.slice(0, 6).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />

                      {i !== example.nodes.slice(0, 6).length - 1 && (
                        <div className="w-6 h-0.5 bg-white/30" />
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => loadExample(example)}
                  className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition text-sm font-medium"
                >
                  Load Template
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
