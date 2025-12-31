import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];

function DraggableRecipe({ recipe }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: recipe._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-2 bg-white border rounded shadow cursor-grab"
    >
      {recipe.title}
    </div>
  );
}

export default function MealPlanner() {
  const [recipes, setRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState(
    days.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
  );

  useEffect(() => {
    api.get("/recipes").then(res => setRecipes(res.data));

    api.get("/mealplans").then(res => {
      if (res.data?.meals) setMealPlan(res.data.meals);
    });
  }, []);

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const recipeId = active.id;
    const day = over.id;

    setMealPlan(prev => ({
      ...prev,
      [day]: [...prev[day], recipeId]
    }));
  };

  const saveMealPlan = async () => {
    await api.post("/mealplans", {
      weekStartDate: new Date(),
      meals: mealPlan
    });
    alert("Meal plan saved!");
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Recipe List */}
      <div>
        <h2 className="text-lg font-bold mb-2">Recipes</h2>
        <DndContext collisionDetection={closestCenter}>
          <SortableContext
            items={recipes.map(r => r._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {recipes.map(recipe => (
                <DraggableRecipe key={recipe._id} recipe={recipe} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Meal Planner Grid */}
      <div className="md:col-span-2">
        <h2 className="text-lg font-bold mb-2">Weekly Planner</h2>

        <DndContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {days.map(day => (
              <div
                key={day}
                id={day}
                className="min-h-[120px] border rounded p-2 bg-gray-50"
              >
                <h3 className="capitalize font-semibold mb-2">{day}</h3>
                {mealPlan[day].map((id, idx) => {
                  const recipe = recipes.find(r => r._id === id);
                  return (
                    <div
                      key={idx}
                      className="text-sm bg-green-100 p-1 rounded mb-1"
                    >
                      {recipe?.title}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </DndContext>

        <button
          onClick={saveMealPlan}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Meal Plan
        </button>
      </div>
    </div>
  );
}
