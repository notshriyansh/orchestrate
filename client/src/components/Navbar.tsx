import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import Button from "./ui/Button";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    return auth.onAuthStateChanged(setUser);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Orchestrate
      </Link>

      <div className="nav-actions">
        {user ? (
          <>
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>

            <Button size="sm" onClick={() => signOut(auth)}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/signin">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>

            <Link to="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
