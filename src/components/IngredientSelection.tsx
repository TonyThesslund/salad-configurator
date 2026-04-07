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
}

export function IngredientSelection({ ingredients, categories }: Props) {

  const filteredCategories = categories.filter((cat) => cat.id !==6);
  const filteredIngredients = ingredients.filter((ingredient) => ingredient.categoryId !== 6);

 return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full shadow-lg">

      <input
        type="text"
        placeholder="Etsi tuotteita"
        className="rounded-full px-6 py-3 text-black outline-none w-64 border-2 border-transparent focus:border-[#A2D135]"
      />

      <div className="flex flex-wrap gap-3 mt-4">
        {filteredCategories.map((category) => (
          <button
            key={category.id}
            className="bg-[#A2D135] text-black font-bold px-6 py-2 rounded-full hover:opacity-90"
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
    </div>
  );
}