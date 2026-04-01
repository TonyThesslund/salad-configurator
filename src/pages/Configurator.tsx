import { useEffect, useState } from "react";
import { getBowls, getCategories, getIngredients } from "../services/api";

import { BaseSelection } from "../components/BaseSelection";
import { BowlSelection } from "../components/BowlSelection";
import { CenterBowl } from "../components/CenterBowl";
import { IngredientSelection } from "../components/IngredientSelection";
import { SummaryBar } from "../components/SummaryBar";

interface Bowl {
  id: number;
  name: string;
  size: string;
}

interface Category {
  id: number;
  name: string;
  size: string;
}

interface Ingredient {
  id: number;
  name: string;
  categoryId: number;
  price: number;
}

export default function Configurator() {

  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

useEffect(() => {
    const fetchBowls = async () => {
      try {
        const data = await getBowls<Bowl[]>();
        setBowls(data);
      } catch (error) {
        console.error("Failed to fetch bowls:", error);
      }
    }

    fetchBowls();

    const fetchCategories = async () => {
      try {
        const data = await getCategories<Category[]>();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategoriesError("Failed to fetch categories");
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();

    const fetchIngredients = async () => {
      try {
        const data = await getIngredients<Ingredient[]>();
        setIngredients(data);
      } catch (err) {
        console.error("Failed to fetch ingredients:", err);
      }
    };

    fetchIngredients();
  }, []);
  

  return (
    <div className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4">
      <div className="flex">

        {isLoadingCategories && <p>Loading categories...</p>}
        {categoriesError && <p className="text-red-500">{categoriesError}</p>}

        <BowlSelection bowls={bowls}/>
        <CenterBowl />
        <BaseSelection />
      </div>

      <IngredientSelection categories={categories} ingredients={ingredients}/>
      <SummaryBar />
    </div>
  );
}