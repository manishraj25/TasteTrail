import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ShoppingList() {
  const [shoppingList, setShoppingList] = useState(null);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const res = await api.get("/shopping-list");
      setShoppingList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!shoppingList) return <div className="p-6">Loading...</div>;

  // Group items by category
  const categories = {};
  shoppingList.items.forEach((item) => {
    const cat = item.category || "Others";
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(item);
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Shopping List</h2>

      {Object.keys(categories).map((cat) => (
        <div key={cat} className="mb-4">
          <h3 className="text-xl font-semibold mb-2">{cat}</h3>
          <ul className="list-disc ml-6">
            {categories[cat].map((item, idx) => (
              <li key={idx}>
                {item.name} — {item.quantity} {item.unit || ""}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => window.print()}
      >
        Print Shopping List
      </button>
    </div>
  );
}
