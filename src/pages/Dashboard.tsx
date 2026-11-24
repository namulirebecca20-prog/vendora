
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <main className="dashboard">
      <nav className="navbar">
        <h2>Vendora<span>.</span></h2>
        <button onClick={() => signOut()}>Log out</button>
      </nav>

      <section className="welcome">
        <p>YOUR MARKETPLACE</p>
        <h1>Welcome to Vendora!</h1>
        <p>{user?.email}</p>
      </section>

      <section className="dashboard-content">
        <h2>Your marketplace starts here.</h2>
        <p>Discover products, shop from sellers, and build your own store.</p>
        <button className="primary-button">Explore marketplace</button>
      </section>
    </main>
  );
          }
