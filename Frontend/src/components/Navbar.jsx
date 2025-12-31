import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav className="bg-green-600 p-4 text-white flex justify-between">
      <Link to="/" className="font-bold">TasteTrail</Link>
      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/meal-planner">Meal Planner</Link>
            <Link to="/shopping-list">Shopping List</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={() => {
              localStorage.clear();
              location.href = "/login";
            }}>Logout</button>
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
