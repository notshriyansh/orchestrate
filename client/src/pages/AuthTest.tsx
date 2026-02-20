import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import axios from "axios";

export default function AuthTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCred.user.getIdToken();

    const res = await axios.get("http://localhost:5000/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Backend response:", res.data);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Test Login</h2>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={login}>Login</button>
    </div>
  );
}

const login = async () => {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCred.user.getIdToken();

    console.log("ID TOKEN:", token);

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Backend response:", res.data);
  } catch (error: any) {
    console.error("Login error:", error.message);
  }
};
