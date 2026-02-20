import { GitBranch, Play, Upload, Eye } from "lucide-react";

const features = [
  {
    icon: GitBranch,
    title: "Visual Builder",
    desc: "Drag & connect API nodes.",
  },
  {
    icon: Play,
    title: "Live Execution",
    desc: "Run workflows with status updates.",
  },
  {
    icon: Eye,
    title: "Request Inspector",
    desc: "Inspect requests & responses.",
  },
  {
    icon: Upload,
    title: "Postman Import",
    desc: "Import complex collections instantly.",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-24 border-t border-border">
      <div className="container grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f) => (
          <div key={f.title} className="p-6 rounded-xl border bg-card">
            <f.icon className="h-6 w-6 text-primary mb-4" />
            <h3 className="font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
