
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const {
    signUp,
    signIn,
    signInWithGoogle,
    resetPassword,
  } = useAuth();

  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (mode === "signup" && password !== confirm) {
      setMessage("Your passwords do not match.");
      return;
    }

    setBusy(true);

    try {
      if (mode === "signup") {
        await signUp(name, email, password);
        setMessage("Account created! Check your email if confirmation is required.");
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    setMessage("");

    try {
      await signInWithGoogle();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Google sign-in failed.");
      setBusy(false);
    }
  }

  async function handleReset() {
    if (!email.trim()) {
      setMessage("Enter your email address first.");
      return;
    }

    setBusy(true);
    setMessage("");

    try {
      await resetPassword(email);
      setMessage("Password reset instructions have been sent if that account exists.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not send reset email.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand-mark">V</div>

        <h1>Welcome to Vendora</h1>
        <p>A marketplace for everyone.</p>

        <div className="auth-tabs">
          <button type="button" onClick={() => setMode("signup")}>
            Create account
          </button>
          <button type="button" onClick={() => setMode("login")}>
            Log in
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <label>
              Full name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
              />
            </label>
          )}

          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              minLength={8}
              required
            />
          </label>

          {mode === "signup" && (
            <label>
              Confirm password
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Enter password again"
                required
              />
            </label>
          )}

          <button className="primary-button" disabled={busy}>
            {busy ? "Please wait..." : mode === "signup" ? "Create account" : "Log in"}
          </button>
        </form>

        {mode === "login" && (
          <button
            type="button"
            className="text-button"
            onClick={handleReset}
            disabled={busy}
          >
            Forgot password?
          </button>
        )}

        <div className="auth-divider">OR</div>

        <button
          type="button"
          className="google-button"
          onClick={handleGoogle}
          disabled={busy}
        >
          Continue with Google
        </button>

        {message && <p className="auth-message">{message}</p>}

        <p className="switch-mode">
          {mode === "signup" ? "Already registered?" : "New to Vendora?"}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "signup" ? "login" : "signup");
              setMessage("");
            }}
          >
            {mode === "signup" ? "Log in" : "Create account"}
          </button>
        </p>
      </div>
    </div>
  );
}
  
