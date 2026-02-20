import { Webhook } from "lucide-react";
import BaseNode from "./BaseNode";

export default function WebhookNode({ data }: any) {
  return (
    <BaseNode
      icon={<Webhook size={16} />}
      title="Webhook"
      accentColor="#22c55e"
      data={data}
    >
      {data.label || "Incoming Trigger"}
    </BaseNode>
  );
}
