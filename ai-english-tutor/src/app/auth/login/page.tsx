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
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">Log In</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="signup-button"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        <p className="login-link">
          Don't have an account? <a href="./signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
