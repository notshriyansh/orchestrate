import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function CTASection() {
  return (
    <section
      style={{
        padding: "120px 20px",
        textAlign: "center",
        background: "#0f172a",
        borderTop: "1px solid #1e293b",
        color: "white",
      }}
    >
      <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>
        Ready to orchestrate?
      </h2>

      <Link to="/signup">
        <Button size="lg">Start Free</Button>
      </Link>
    </section>
  );
}
