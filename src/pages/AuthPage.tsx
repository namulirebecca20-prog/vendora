
"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const { signUp, signIn, signInWithGoogle, resetPassword } = useAuth();

  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match.");
        }

        await signUp(fullName, email, password);
        setMessage("Registration submitted! Check your email if confirmation is required.");
        setMode("login");
      } else {
        await signIn(email, password);
        setMessage("Login successful!");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setLoading(true);

    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed.");
      setLoading(false);
    }
  }

  async function handleReset() {
    if (!email) {
      setError("Enter your email address first.");
      return;
    }

    setError("");
    setMessage("");

    try {
      await resetPassword(email);
      setMessage("Password reset instructions have been sent if the account exists.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Password reset failed.");
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="brand-mark">V</div>

        <h1>Welcome to Vendora</h1>
        <p>A marketplace for everyone.</p>

        <div className="auth-tabs">
          <button type="button" onClick={() => {
            setMode("signup");
            setError("");
            setMessage("");
          }}>
            Create account
          </button>

          <button type="button" onClick={() => {
            setMode("login");
            setError("");
            setMessage("");
          }}>
            Log in
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <label>
              Full name
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </label>
          )}

          <label>
            Email address
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </label>

          <label>
            Password
            <input
              required
              type="password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </label>

          {mode === "signup" && (
            <label>
              Confirm password
              <input
                required
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
            </label>
          )}

          {mode === "login" && (
            <button
              className="text-button"
              type="button"
              onClick={handleReset}
            >
              Forgot password?
            </button>
          )}

          <button className="primary-button" type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "signup"
                ? "Create account"
                : "Log in"}
          </button>
        </form>

        <div className="auth-divider">OR</div>

        <button
          className="google-button"
          type="button"
          onClick={handleGoogle}
          disabled={loading}
        >
          Continue with Google
        </button>

        {message && <p className="auth-message">{message}</p>}
        {error && <p className="auth-message" role="alert">{error}</p>}

        <p className="switch-mode">
          {mode === "signup" ? "Already have an account?" : "New to Vendora?"}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "signup" ? "login" : "signup");
              setError("");
              setMessage("");
            }}
          >
            {mode === "signup" ? "Log in" : "Create account"}
          </button>
        </p>
      </section>
    </main>
  );
}
