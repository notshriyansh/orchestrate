export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 text-center text-sm text-white/40">
      <div className="container">
        © {new Date().getFullYear()} Orchestrate — Visual Workflow Engine
      </div>
    </footer>
  );
}
