import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    dietType: "",
    prepTime: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchRecipes = async () => {
    const res = await api.get("/recipes");
    setRecipes(res.data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const submitRecipe = async () => {
    const payload = {
      ...form,
      ingredients: form.ingredients.split(","),
      instructions: form.instructions.split(".")
    };

    if (editingId) {
      await api.put(`/recipes/${editingId}`, payload);
    } else {
      await api.post("/recipes", payload);
    }

    setForm({
      title: "",
      description: "",
      ingredients: "",
      instructions: "",
      dietType: "",
      prepTime: ""
    });
    setEditingId(null);
    fetchRecipes();
  };

  const editRecipe = (recipe) => {
    setEditingId(recipe._id);
    setForm({
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients.join(","),
      instructions: recipe.instructions.join("."),
      dietType: recipe.dietType,
      prepTime: recipe.prepTime
    });
  };

  const deleteRecipe = async (id) => {
    if (confirm("Delete this recipe?")) {
      await api.delete(`/recipes/${id}`);
      fetchRecipes();
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin – Recipe Management</h2>

      {/* FORM */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h3 className="font-semibold mb-2">
          {editingId ? "Edit Recipe" : "Add Recipe"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input className="input" placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
          <input className="input" placeholder="Diet Type (Vegan, Keto)"
            value={form.dietType}
            onChange={e => setForm({ ...form, dietType: e.target.value })}
          />
          <input className="input" placeholder="Prep Time (mins)"
            value={form.prepTime}
            onChange={e => setForm({ ...form, prepTime: e.target.value })}
          />
        </div>

        <textarea className="input mt-2" placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <textarea className="input mt-2" placeholder="Ingredients (comma separated)"
          value={form.ingredients}
          onChange={e => setForm({ ...form, ingredients: e.target.value })}
        />

        <textarea className="input mt-2" placeholder="Instructions (dot separated)"
          value={form.instructions}
          onChange={e => setForm({ ...form, instructions: e.target.value })}
        />

        <button
          onClick={submitRecipe}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Recipe" : "Add Recipe"}
        </button>
      </div>

      {/* RECIPE TABLE */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Title</th>
            <th>Diet</th>
            <th>Prep</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map(r => (
            <tr key={r._id} className="border-t">
              <td className="p-2">{r.title}</td>
              <td>{r.dietType}</td>
              <td>{r.prepTime} min</td>
              <td className="space-x-2">
                <button
                  onClick={() => editRecipe(r)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteRecipe(r._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
