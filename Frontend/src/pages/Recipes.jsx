import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import RecipeCard from "../components/RecipeCard";
import Footer from "../components/Footer";

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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[80vh]">
                <p className="text-lg text-gray-700">Loading recipes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[80vh]">
                <p className="text-lg text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-16">

            {/* HERO SECTION */}
            <section className="bg-linear-to-b from-green-600 to-green-300 text-white">
                <div className="max-w-6xl mx-auto px-6 py-20 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Discover, Plan & Cook Smarter 🍽️
                    </h1>
                    <p className="text-lg md:text-xl mb-6 text-green-100">
                        Personalized recipes, weekly meal planning, and smart shopping lists — all in one place.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            to="/register"
                            className="bg-white text-green-600 px-6 py-3 rounded font-semibold"
                        >
                            Plan Your Meals
                        </Link>
                        <Link
                            to="/register"
                            className="border border-white px-6 py-3 rounded font-semibold"
                        >
                            Explore Recipes
                        </Link>
                    </div>
                </div>
            </section>

            {/* FEATURED RECIPES */}
            <section className="max-w-6xl mx-auto px-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Explore Recipes</h2>
                    <Link to="/recipes" className="text-green-600 font-medium">
                        View All →
                    </Link>
                </div>

                {recipes.length === 0 ? (
                    <p className="text-gray-500">No recipes available.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recipes.slice(0, 6).map((recipe) => (
                            <RecipeCard key={recipe._id} recipe={recipe} />
                        ))}
                    </div>
                )}
            </section>

            {/* FEATURES / ABOUT SECTION */}
            <section className="bg-gray-50 my-0">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <h2 className="text-3xl font-bold text-center mb-10">
                        Why Choose TasteTrail?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="bg-white p-6 rounded shadow text-center">
                            <div className="text-4xl mb-3">📅</div>
                            <h3 className="text-xl font-semibold mb-2">Plan Your Meals</h3>
                            <p className="text-gray-600">
                                Drag and drop recipes into your weekly planner and stay organized.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded shadow text-center">
                            <div className="text-4xl mb-3">❤️</div>
                            <h3 className="text-xl font-semibold mb-2">Save Your Favorites</h3>
                            <p className="text-gray-600">
                                Bookmark recipes and build your personal collections.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded shadow text-center">
                            <div className="text-4xl mb-3">🛒</div>
                            <h3 className="text-xl font-semibold mb-2">Shop Smarter</h3>
                            <p className="text-gray-600">
                                Automatically generate categorized shopping lists from your meal plan.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
            <Footer />
        </div>

    );
}
