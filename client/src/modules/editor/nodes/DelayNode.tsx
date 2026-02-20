import { Timer } from "lucide-react";
import BaseNode from "./BaseNode";

export default function DelayNode({ data }: any) {
  return (
    <BaseNode
      icon={<Timer size={16} />}
      title="Delay"
      accentColor="#facc15"
      data={data}
    >
      {data.label || "Wait"}
    </BaseNode>
  );
}
