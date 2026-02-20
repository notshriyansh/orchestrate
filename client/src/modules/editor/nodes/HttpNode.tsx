import { Globe } from "lucide-react";
import BaseNode from "./BaseNode";

export default function HttpNode({ data }: any) {
  return (
    <BaseNode
      icon={<Globe size={16} />}
      title="HTTP"
      accentColor="#38bdf8"
      data={data}
    >
      {data.label || "API Request"}
    </BaseNode>
  );
}
