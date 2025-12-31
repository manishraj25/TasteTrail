import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import ReviewSection from "../components/ReviewSection";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    api.get(`/recipes/${id}`).then(res => setRecipe(res.data));
  }, [id]);

  if (!recipe) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{recipe.title}</h1>

      {recipe.image && (
        <img
          src={recipe.image}
          className="w-full h-64 object-cover rounded my-4"
        />
      )}

      <p>{recipe.description}</p>

      <h3 className="font-semibold mt-4">Ingredients</h3>
      <ul className="list-disc ml-6">
        {recipe.ingredients.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>

      <h3 className="font-semibold mt-4">Instructions</h3>
      <ol className="list-decimal ml-6">
        {recipe.instructions.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ol>

      {/* REVIEWS */}
      <ReviewSection recipeId={id} />
    </div>
  );
}
