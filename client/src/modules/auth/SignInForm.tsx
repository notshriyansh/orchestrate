import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

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

  const handleGoogle = async () => {
    setError(null);

    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Welcome back</h2>

      <div className="space-y-4">
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-lg 
          border border-white/10 bg-[#0f172a] hover:border-white/30 
          transition text-sm font-medium"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <div className="flex items-center gap-3 text-white/30 text-xs">
          <div className="flex-1 h-px bg-white/10" />
          or
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg 
          bg-[#0f172a] border border-white/10 
          focus:border-blue-500 outline-none transition text-sm"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg 
          bg-[#0f172a] border border-white/10 
          focus:border-blue-500 outline-none transition text-sm"
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
          bg-blue-600 hover:bg-blue-500 transition text-sm font-medium"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </div>

      <p className="text-sm text-slate-400 mt-5">
        No account?{" "}
        <Link to="/signup" className="text-blue-400 hover:text-blue-300">
          Create one
        </Link>
      </p>
    </>
  );
}
