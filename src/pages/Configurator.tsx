import { useEffect, useState } from "react";
import { getBowls, getCategories } from "../services/api";

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

  // Hae kulhot
  useEffect(() => {
    async function fetchBowls() {
      try {
        const data = await getBowls<Bowl[]>();
        setBowls(data);
      } catch (error) {
        console.error("Failed to fetch bowls:", error);
      }
    }

    fetchBowls();
  }, []);

  // Hae kategoriat
  useEffect(() => {
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
  }, []);

  return (
    <div className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4">
      <div className="flex">
        <BowlSelection bowls={bowls} />
        <CenterBowl />
        <BaseSelection />
      </div>

      {/* Näytä lataus tai virhe, jos tarpeen */}
      {isLoadingCategories && <p>Loading categories...</p>}
      {categoriesError && <p className="text-red-500">{categoriesError}</p>}

      {/* Syötetään kategoriat ja ainesosat IngredientSelectioniin */}
      <IngredientSelection categories={categories} ingredients={ingredients} />

      <SummaryBar />
    </div>
  );
}