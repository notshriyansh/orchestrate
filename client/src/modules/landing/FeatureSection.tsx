import { GitBranch, Play, Eye, Upload, Clock, Network } from "lucide-react";

const features = [
  {
    icon: Network,
    title: "System Design Canvas",
    description:
      "Drag infrastructure components like API Gateways, Load Balancers, DBs, Queues and connect them visually.",
  },
  {
    icon: GitBranch,
    title: "Live Edge Propagation",
    description:
      "Watch animated data packets flow through your system in real-time.",
  },
  {
    icon: Play,
    title: "Execution Simulation",
    description:
      "Run workflows and replay execution timelines to debug bottlenecks.",
  },
  {
    icon: Eye,
    title: "Deep Request Inspector",
    description: "Inspect headers, payloads, responses, and status per node.",
  },
  {
    icon: Clock,
    title: "Execution History",
    description:
      "View previous runs, compare results, and replay any execution.",
  },
  {
    icon: Upload,
    title: "Postman Import",
    description:
      "Import entire Postman collections into visual workflows instantly.",
  },
];

export default function FeatureSection() {
  return (
    <section id="features" className="py-28 border-t border-white/5">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-4">Built for complex systems</h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Go beyond simple API testing. Model distributed systems visually and
            simulate real-world request propagation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/40 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center mb-4 group-hover:bg-blue-600/20 transition">
                <feature.icon className="h-5 w-5 text-blue-500" />
              </div>

              <h3 className="font-semibold mb-2">{feature.title}</h3>

              <p className="text-sm text-white/50 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
