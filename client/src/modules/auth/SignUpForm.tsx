import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleSignUp = async () => {
    setError(null);
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
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
      <h2 className="text-3xl font-semibold text-center text-white mb-8">
        Create Your Account
      </h2>

      <div className="space-y-4">
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-white/10 bg-[#0f172a] hover:border-white/30 transition"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <div className="flex items-center gap-3 text-white/30 text-sm">
          <div className="flex-1 h-px bg-white/10" />
          or
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <Input
          placeholder="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />

        {error && (
          <div className="text-red-500 text-sm bg-red-500/10 p-2 rounded">
            {error}
          </div>
        )}

        <Button className="w-full" onClick={handleSignUp} disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mt-4 text-center">
        Already have an account?{" "}
        <Link to="/signin" className="text-primary">
          Sign in
        </Link>
      </p>
    </>
  );
}
