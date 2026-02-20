import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
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
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

      <div className="space-y-4">
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

        <Button className="w-full" onClick={handleSignIn} disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mt-4 text-center">
        No account?{" "}
        <Link to="/signup" className="text-primary">
          Sign up
        </Link>
      </p>
    </>
  );
}
