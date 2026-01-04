export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h3 className="text-xl font-bold text-white mb-2">TasteTrail</h3>
          <p className="text-sm">
            Discover recipes, plan meals, and shop smarter — all in one place.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-2">Product</h4>
          <ul className="space-y-1">
            <li>Meal Planner</li>
            <li>Recipes</li>
            <li>Shopping List</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-2">Connect</h4>
          <ul className="space-y-1">
            <li>GitHub</li>
            <li>LinkedIn</li>
            <li>Email</li>
          </ul>
        </div>

      </div>

      <div className="text-center text-sm py-4 border-t border-gray-700">
        © {new Date().getFullYear()} TasteTrail. All rights reserved.
      </div>
    </footer>
  );
}
