export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, type: string) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  const NodeItem = ({ label, type }: { label: string; type: string }) => (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 cursor-grab text-sm font-medium transition"
    >
      {label}
    </div>
  );

  return (
    <div className="w-56 p-5 border-r border-white/10 bg-slate-900/70 backdrop-blur-xl flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Nodes
      </h3>

      <NodeItem label="HTTP" type="http" />
      <NodeItem label="Delay" type="delay" />
      <NodeItem label="Condition" type="condition" />
      <NodeItem label="Webhook" type="webhook" />
      <NodeItem label="Transform" type="transform" />
      <NodeItem label="Database" type="database" />
      <NodeItem label="Parallel" type="parallel" />
    </div>
  );
}
