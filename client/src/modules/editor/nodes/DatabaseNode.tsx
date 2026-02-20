import { Database } from "lucide-react";
import BaseNode from "./BaseNode";

export default function DatabaseNode({ data }: any) {
  return (
    <BaseNode icon={<Database size={16} />} title="Database" color="#14b8a6">
      {data.label || "DB Operation"}
    </BaseNode>
  );
}
