import { useEffect, useState } from "react";
import {
  getBaseIngredients,
  getBowls,
  getCategories,
  getIngredients,
} from "../services/api";

import { BaseSelection } from "../components/BaseSelection";
import { BowlSelection } from "../components/BowlSelection";
import { CenterBowl } from "../components/CenterBowl";
import { IngredientSelection } from "../components/IngredientSelection";
import { SaveRecipeModal } from "../components/SaveRecipeModal";
import { SummaryBar } from "../components/SummaryBar";

import { useIngredientStore } from "../store/useIngredientStore";
import type { Bowl } from "../types";

interface Category {
  id: number;
  name: string;
  size: string;
  base_type_id: number;
}

interface Ingredient {
  id: number;
  name: string;
  categoryId: number;
  price: number;
}

interface BaseIngredient {
  id: number;
  name: string;
  price?: number;
  type_id?: number;
  base_type_id?: number;
}

export default function Configurator() {
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [baseIngredients, setBaseIngredients] = useState<BaseIngredient[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [isSaveRecipeModalOpen, setIsSaveRecipeModalOpen] = useState(false);

  const baseType = useIngredientStore((state) => state.baseType);

  useEffect(() => {
    const fetchBowls = async () => {
      try {
        const data = await getBowls<Bowl[]>();
        setBowls(data);
      } catch (error) {
        console.error("Failed to fetch bowls:", error);
      }
    };

    const fetchIngredients = async () => {
      try {
        const data = await getIngredients<Ingredient[]>();
        setIngredients(data);
      } catch (err) {
        console.error("Failed to fetch ingredients:", err);
      }
    };

    const fetchBaseIngredients = async () => {
      try {
        const data = await getBaseIngredients<BaseIngredient[]>();
        setBaseIngredients(data);
      } catch (err) {
        console.error("Failed to fetch base ingredients:", err);
      }
    };

    fetchBowls();
    fetchIngredients();
    fetchBaseIngredients();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      setCategoriesError(null);

      try {
        const data = await getCategories<Category[]>(baseType);
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategoriesError("Failed to fetch categories");
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [baseType]);

  const filteredBowls = bowls.filter(
    (bowl) => bowl.base_type_id === baseType
  );

  return (
    <div className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4">
      <div className="flex">
        <BowlSelection bowls={filteredBowls} />
        <CenterBowl onOpenSaveModal={() => setIsSaveRecipeModalOpen(true)} />
        <BaseSelection ingredients={baseIngredients} />
      </div>

      <IngredientSelection
        categories={categories}
        ingredients={ingredients}
        isLoadingCategories={isLoadingCategories}
        categoriesError={categoriesError}
      />
      <SummaryBar />
      <SaveRecipeModal
        isOpen={isSaveRecipeModalOpen}
        onClose={() => setIsSaveRecipeModalOpen(false)}
      />
    </div>
  );
}