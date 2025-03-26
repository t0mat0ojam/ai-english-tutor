"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase"; // Ensure the import path is correct

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Attempting to log in with:", email, password);

      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Supabase Login Response:", data, loginError);

      if (loginError) throw new Error(loginError.message);
      if (!data.user) throw new Error("Login failed. Please check your credentials.");

      console.log("User successfully logged in:", data.user);

      // ✅ Force reloading session before redirecting
      await new Promise((resolve) => setTimeout(resolve, 500)); // Small delay for state update

      // ✅ Ensure redirection works
      router.push("/dashboard"); // Redirect to Dashboard page after login
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
      <h1>Log In</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ margin: "10px 0", padding: "10px", width: "100%" }}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ margin: "10px 0", padding: "10px", width: "100%" }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            fontSize: "1rem",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          {loading ? "Logging In..." : "Log In"}
        </button>
      </form>
      <p>
        Don't have an account? <a href="./signup">Sign Up</a>
      </p>
    </div>
  );
};

export default LoginPage;
