import { IngredientCard } from "./IngredientCard";

interface Ingredient {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  diets: string[];
}

interface Props {
  ingredients: Ingredient[];
  categories: Category[];
}

export function IngredientSelection({ ingredients, categories }: Props) {
  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full shadow-lg">
      <input
        type="text"
        className="rounded-full px-6 py-3 text-black outline-none w-64 border-2 border-transparent focus:border-[#A2D135]"
      />

      <button className="bg-[#A2D135] text-black font-bold px-6 py-2 rounded-full">
        Placeholder
      </button>
      <button className="bg-[#A2D135] text-black font-bold px-6 py-2 rounded-full">
        Placeholder
      </button>
      <button className="bg-[#A2D135] text-black font-bold px-6 py-2 rounded-full">
        Placeholder
      </button>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {ingredients.map((ingredient) => (
          <IngredientCard key={ingredient.id} ingredient={ingredient} />
        ))}
      </div>
    </div>
  );
}