import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

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
