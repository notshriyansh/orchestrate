import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "../../components/ui/Button";

export default function HeroSection() {
  return (
    <section
      style={{
        paddingTop: "140px",
        paddingBottom: "120px",
        textAlign: "center",
        background: "#0f172a",
        color: "white",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 20px" }}>
        <h1
          style={{
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: 24,
          }}
        >
          Debug API workflows,
          <span style={{ color: "#3b82f6" }}> visually</span>
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: 18,
            marginBottom: 36,
          }}
        >
          Build, execute, and debug multi-step API workflows on an interactive
          canvas. See every request and response in real time.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          <Link to="/signup">
            <Button size="lg">
              Get Started
              <ArrowRight style={{ marginLeft: 8 }} size={16} />
            </Button>
          </Link>

          <Link to="/signin">
            <Button size="lg" variant="outline">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
