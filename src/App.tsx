
import { useAuth } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading-screen">Loading Vendora...</div>;
  }

  return user ? <Dashboard /> : <AuthPage />;
}

export default App;
