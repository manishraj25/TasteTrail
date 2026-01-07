import Footer from "../components/Footer";

export default function Recipes() {
    const recipes = [
        {
            _id: "1",
            title: "Creamy Avocado Pasta",
            image:
                "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
            dietType: "Vegan",
            prepTime: 25,
        },
        {
            _id: "2",
            title: "Grilled Chicken Bowl",
            image:
                "https://images.unsplash.com/photo-1604908177522-429b6b1b6b95?auto=format&fit=crop&w=800&q=80",
            dietType: "High Protein",
            prepTime: 30,
        },
        {
            _id: "3",
            title: "Healthy Berry Smoothie",
            image:
                "https://images.unsplash.com/photo-1505253716362-afaea1b97a7d?auto=format&fit=crop&w=800&q=80",
            dietType: "Gluten Free",
            prepTime: 10,
        },
        {
            _id: "4",
            title: "Paneer Tikka Masala",
            image:
                "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
            dietType: "Vegetarian",
            prepTime: 40,
        }
    ];


    return (
        <div className="space-y-15">

            {/* HERO SECTION */}
            <section className="relative w-10/12 min-h-[80vh] flex items-center mx-auto rounded-lg overflow-hidden mt-10">

                {/* BACKGROUND IMAGE */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')"
                    }}
                />

                <div className="absolute inset-0 bg-black/40" />

                {/* CONTENT */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Discover, Plan & Cook Smarter 🍽️
                    </h1>

                    <p className="text-lg md:text-xl mb-8 text-gray-200">
                        Personalized recipes, weekly meal planning, and smart shopping lists — all in one place.
                    </p>

                    <div className="flex justify-center gap-4">
                        <a
                            href="/register"
                            className="bg-white text-green-700 px-6 py-3 rounded font-semibold shadow hover:scale-105 transition"
                        >
                            Plan Your Meals
                        </a>

                        <a
                            href="/register"
                            className="border border-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-green-700 transition"
                        >
                            Explore Recipes
                        </a>
                    </div>
                </div>

            </section>



            {/* FEATURED RECIPES */}
            <section className="max-w-10/12 mx-auto">
                <h2 className="text-3xl font-bold mb-8">Explore Recipes</h2>

                {recipes.length === 0 ? (
                    <p className="text-gray-500">No recipes available.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {recipes.slice(0, 4).map((recipe) => (
                            <div
                                key={recipe._id}
                                className="group relative rounded-xl overflow-hidden shadow hover:shadow-xl transition"
                            >
                                {/* IMAGE */}
                                <div
                                    className="h-56 bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${recipe.image ||
                                            "https://images.unsplash.com/photo-1490645935967-10de6ba17061"
                                            })`
                                    }}
                                />

                                {/* OVERLAY */}
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />

                                {/* CONTENT */}
                                <div className="absolute bottom-0 p-4 text-white">
                                    <h3 className="text-lg font-semibold leading-tight">
                                        {recipe.title}
                                    </h3>

                                    <div className="flex gap-3 text-sm text-gray-200 mt-1">
                                        {recipe.dietType && <span>{recipe.dietType}</span>}
                                        {recipe.prepTime && <span>• {recipe.prepTime} min</span>}
                                    </div>
                                </div>
                            </div>
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
