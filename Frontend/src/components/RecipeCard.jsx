import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <div className="border rounded p-4">
      {recipe.image && <img src={recipe.image} className="h-40 w-full object-cover" />}
      <h3 className="font-bold">{recipe.title}</h3>
      <p>{recipe.dietType}</p>
      <Link to={`/recipes/${recipe._id}`} className="text-green-600">View</Link>
    </div>
  );
}
