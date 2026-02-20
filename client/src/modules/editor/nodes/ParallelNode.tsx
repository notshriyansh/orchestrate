import { Split } from "lucide-react";
import BaseNode from "./BaseNode";

export default function ParallelNode({ data }: any) {
  return (
    <BaseNode
      icon={<Split size={16} />}
      title="Parallel"
      accentColor="#ec4899"
      data={data}
    >
      {data.label || "Parallel Branch"}
    </BaseNode>
  );
}
