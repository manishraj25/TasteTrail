import { useEffect, useState } from "react";
import api from "../api/axios";
import RecipeCard from "../components/RecipeCard";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    api.get("/recipes").then(res => setRecipes(res.data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {recipes.map(r => <RecipeCard key={r._id} recipe={r} />)}
    </div>
  );
}
