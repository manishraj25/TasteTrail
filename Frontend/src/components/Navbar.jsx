import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) return null; // or spinner

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-green-600 p-4 text-white flex justify-between">
      <Link to="/" className="font-bold">
        TasteTrail
      </Link>

      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/meal-planner">Meal Planner</Link>
            <Link to="/shopping-list">Shopping List</Link>
            <Link to="/profile">Profile</Link>

            <button
              onClick={handleLogout}
              className="bg-white text-green-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
