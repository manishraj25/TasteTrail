import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import MealPlanner from "./pages/MealPlanner";
import ShoppingList from "./pages/ShoppingList";
import Profile from "./pages/Profile";
import AdminRecipes from "./pages/AdminRecipes";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/recipes" element={<AdminRecipes />} />
        </Route>
      </Routes>
    </>
  );
}
