import { useState } from "react";
import { IngredientCard } from "./IngredientCard";

interface Ingredient {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  diets?: string[];
}

interface Category {
  id: number;
  name: string;
}

interface Props {
  ingredients: Ingredient[];
  categories: Category[];
  isLoadingCategories?: boolean;
  categoriesError?: string | null;
}

export function IngredientSelection({
  ingredients,
  categories,
  isLoadingCategories = false,
  categoriesError = null,
}: Props) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((cat) => cat.id !== 6);
  const filteredIngredients = ingredients
    .filter((ingredient) => ingredient.categoryId !== 6)
    .filter((ingredient) => activeCategory === null || ingredient.categoryId === activeCategory)
    .filter((ingredient) => ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full shadow-lg">
      <input
        type="text"
        placeholder="Etsi tuotteita"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="rounded-full px-6 py-3 text-white outline-none w-64 border-2 focus:border-[#A2D135]"
      />

      {isLoadingCategories && (
        <p className="mt-4 text-sm text-zinc-300">Loading categories...</p>
      )}
      {categoriesError && (
        <p className="mt-4 text-sm text-red-400">{categoriesError}</p>
      )}

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          onClick={() => setActiveCategory(null)}
          className={`${activeCategory === null ? 'bg-[#A2D135]' : 'bg-zinc-600'} text-black font-bold px-6 py-2 rounded-full hover:opacity-90`}
        >
          Kaikki
        </button>
        {filteredCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`${activeCategory === category.id ? 'bg-[#A2D135]' : 'bg-zinc-600'} text-black font-bold px-6 py-2 rounded-full hover:opacity-90`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        {filteredIngredients.map((ingredient) => (
          <IngredientCard key={ingredient.id} ingredient={ingredient} />
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-6 text-sm text-zinc-300">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#A2D135]">G</span>
          <span>Gluteeniton</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-[#A2D135]">L</span>
          <span>Laktoositon</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-[#A2D135]">V</span>
          <span>Vegaaninen</span>
        </div>
      </div>
    </div>
  );
}
