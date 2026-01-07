import { useEffect, useState } from "react";
import api from "../api/axios";
import RecipeCard from "../components/RecipeCard";

export default function DashboardPage() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [todayMeal, setTodayMeal] = useState(null);
  const [dietFilter, setDietFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [recipesRes, savedRes, mealRes] = await Promise.all([
          api.get("/recipes"),
          api.get("/recipes/saved"),
          api.get("/meal-plans/today")
        ]);

        setRecipes(recipesRes.data);
        setSavedRecipes(savedRes.data);
        setTodayMeal(mealRes.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const filteredRecipes =
    dietFilter === "all"
      ? recipes
      : recipes.filter((r) => r.dietType === dietFilter);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold">Welcome back 👋</h1>
          <p className="text-gray-600 mt-1">
            Let’s plan today’s meals and explore new recipes.
          </p>
        </div>
      </section>

      {/* TODAY'S MEAL */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-xl font-semibold mb-4">🍽️ Today’s Meal</h2>

        {loading ? (
          <SkeletonRow />
        ) : todayMeal ? (
          <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{todayMeal.title}</h3>
              <p className="text-gray-600">
                {todayMeal.mealType} • {todayMeal.prepTime} min
              </p>
            </div>
            <span className="text-green-600 font-medium">Planned</span>
          </div>
        ) : (
          <p className="text-gray-500">No meal planned for today.</p>
        )}
      </section>

      {/* DIET FILTER */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex gap-3 mb-6">
          {["all", "Vegan", "Vegetarian", "Gluten Free", "High Protein"].map(
            (diet) => (
              <button
                key={diet}
                onClick={() => setDietFilter(diet)}
                className={`px-4 py-2 rounded-full border text-sm transition ${
                  dietFilter === diet
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {diet}
              </button>
            )
          )}
        </div>
      </section>

      {/* EXPLORE RECIPES */}
      <section className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Explore Recipes</h2>
          <a href="/recipes" className="text-green-600 hover:underline">
            View all →
          </a>
        </div>

        {loading ? (
          <SkeletonGrid />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRecipes.slice(0, 8).map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

      {/* RECENTLY SAVED */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">❤️ Recently Saved</h2>

        {loading ? (
          <SkeletonGrid />
        ) : savedRecipes.length === 0 ? (
          <p className="text-gray-500">No saved recipes yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedRecipes.slice(0, 4).map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

/* ===================== */
/* SKELETON COMPONENTS   */
/* ===================== */

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-64 rounded-xl bg-gray-200 animate-pulse"
        />
      ))}
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="h-20 rounded-xl bg-gray-200 animate-pulse" />
  );
}
