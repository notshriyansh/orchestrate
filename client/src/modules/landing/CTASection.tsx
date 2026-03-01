export default function CTASection() {
  return (
    <section className="py-28 border-t border-white/5 text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Ready to design your system?
        </h2>

        <p className="text-white/50 mb-10">
          Start building distributed workflows visually and simulate real
          execution flows in seconds.
        </p>

        <a
          href="/signup"
          className="inline-flex items-center px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition font-medium"
        >
          Create Free Account
        </a>
      </div>
    </section>
  );
}
