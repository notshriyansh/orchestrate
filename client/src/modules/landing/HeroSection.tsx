import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "../../components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative pt-40 pb-32 text-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-200 h-125 bg-blue-600/10 blur-[140px] rounded-full" />
      </div>

      <div className="container relative max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs rounded-full border border-white/10 bg-white/5 text-white/60">
          System design meets API debugging
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
          Visualize. Execute. Debug.
          <br />
          <span className="text-blue-500">Complex API workflows.</span>
        </h1>

        <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
          Orchestrate is a real-time visual canvas for building distributed
          workflows — APIs, load balancers, queues, databases, and more — all
          connected and executable with live propagation.
        </p>

        <div className="flex justify-center gap-4">
          <Link to="/dashboard">
            <Button size="lg">
              Start Building
              <ArrowRight size={16} />
            </Button>
          </Link>

          <Button size="lg" variant="outline">
            <a href="#features">Explore Features</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
