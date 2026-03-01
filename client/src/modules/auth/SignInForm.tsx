import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { Link, useNavigate } from "react-router-dom";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async () => {
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-8">Welcome back</h2>

      <div className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg 
                   bg-[#0f172a] border border-white/10 
                   focus:border-blue-500 outline-none 
                   transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg 
                   bg-[#0f172a] border border-white/10 
                   focus:border-blue-500 outline-none 
                   transition"
        />

        {error && (
          <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleSignIn}
          disabled={loading}
          className="w-full py-3 rounded-lg 
                   bg-blue-600 hover:bg-blue-500
                   transition font-medium"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </div>

      <p className="text-sm text-slate-400 mt-6">
        No account?{" "}
        <Link to="/signup" className="text-blue-400 hover:text-blue-300">
          Create one
        </Link>
      </p>
    </>
  );
}
