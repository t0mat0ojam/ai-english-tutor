"use client"; // Ensure this runs on the client side

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import { supabase } from "../../../lib/supabase"; // Ensure this path is correct

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // Initialize Next.js router

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      // Sign up the user using Supabase authentication
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        throw new Error(signUpError.message);
      }

      console.log("User signed up successfully:", data);

      // Redirect user to the dashboard after sign-up
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">Sign Up</h1>
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button className="close-error" onClick={() => setError("")}>
              &times;
            </button>
          </div>
        )}
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="login-link">
          Already have an account? <a href="./login">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;














