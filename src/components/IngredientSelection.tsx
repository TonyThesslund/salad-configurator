import { useState, useEffect } from "react";
import { useIngredientStore } from "../store/useIngredientStore";
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
  base_type_id?: number;
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
  const baseType = useIngredientStore((state) => state.baseType);

  // Reset activeCategory to null when baseType changes
  useEffect(() => {
    setActiveCategory(null);
  }, [baseType]);

  // Filter categories by baseType
  const filteredCategories = categories.filter(
    (cat) => cat.id !== 6 && (cat.base_type_id === undefined || cat.base_type_id === baseType)
  );

  // Filter ingredients by baseType through their category
  const filteredIngredients = ingredients
    .filter((ingredient) => ingredient.categoryId !== 6)
    .filter((ingredient) => {
      const category = categories.find((cat) => cat.id === ingredient.categoryId);
      return category && (category.base_type_id === undefined || category.base_type_id === baseType);
    })
    .filter((ingredient) => activeCategory === null || ingredient.categoryId === activeCategory)
    .filter((ingredient) => ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full shadow-lg">

      <div className="flex items-center justify-center mb-8 gap-3">
        <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">
          3
        </div>
        <h2 className="font-semibold text-lg">Lisää raaka-aineet</h2>
      </div>


      <div className="flex items-center mb-2">
        <div className="flex items-center bg-zinc-100 rounded-full px-4 py-2 w-64">
          <img src="/src/assets/icons/magnifying-glass.svg" alt="Etsi" className="w-5 h-5 opacity-40 mr-2" />
          <input
            id="ingredient-search"
            name="ingredient-search"
            type="text"
            placeholder="Etsi tuotteita"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-zinc-600 placeholder-zinc-400 flex-1 text-base"
          />
        </div>
        <div className="flex-1 flex justify-end items-center min-h-[32px] ml-4">
          {isLoadingCategories && (
            <p className="text-sm text-zinc-300">Loading categories...</p>
          )}
          {categoriesError && (
            <p className="text-sm text-red-400 ml-4">{categoriesError}</p>
          )}
        </div>
      </div>

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
          <span className="font-bold bg-[#A2D135] text-black rounded-full w-7 h-7 flex items-center justify-center">G</span>
          <span>Gluteeniton</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold bg-[#A2D135] text-black rounded-full w-7 h-7 flex items-center justify-center">L</span>
          <span>Laktoositon</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold bg-[#A2D135] text-black rounded-full w-8 h-7 flex items-center justify-center">VL</span>
          <span>Vähälaktoosinen</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold bg-[#A2D135] text-black rounded-full w-7 h-7 flex items-center justify-center">V</span>
          <span>Soveltuu vegaaniseen ruokavalioon</span>
        </div>
      </div>
    </div>
  );
}
