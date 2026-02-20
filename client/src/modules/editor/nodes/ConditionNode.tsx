import { GitBranch } from "lucide-react";
import BaseNode from "./BaseNode";

export default function ConditionNode({ data }: any) {
  return (
    <BaseNode
      icon={<GitBranch size={16} />}
      title="Condition"
      accentColor="#a78bfa"
      data={data}
    >
      {data.label || "If / Else"}
    </BaseNode>
  );
}
