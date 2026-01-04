import { useEffect, useState } from "react";
import api from "../api/axios";
import RecipeCard from "../components/RecipeCard";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await api.get("/recipes");
        setRecipes(res.data);
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
        setError("Failed to load recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <p className="text-lg text-gray-700">Loading recipes...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  // Empty state
  if (recipes.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <p className="text-lg text-gray-500">No recipes found.</p>
      </div>
    );
  }

  // Normal state
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
}
