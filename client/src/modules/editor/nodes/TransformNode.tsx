import { Shuffle } from "lucide-react";
import BaseNode from "./BaseNode";

export default function TransformNode({ data }: any) {
  return (
    <BaseNode
      icon={<Shuffle size={16} />}
      title="Transform"
      accentColor="#f97316"
      data={data}
    >
      {data.label || "Modify Data"}
    </BaseNode>
  );
}
