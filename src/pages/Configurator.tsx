import { useEffect, useMemo, useState } from "react";

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
  categoryId: number;
  price?: number;
  weight_grams?: number;
  image_url?: string;
  wedge_image_url?: string;
  barcode_url?: string;
}

export default function Configurator() {
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [saladBases, setSaladBases] = useState<BaseIngredient[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [isSaveRecipeModalOpen, setIsSaveRecipeModalOpen] = useState(false); 

  const baseType = useIngredientStore((state) => state.baseType);
  
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await getIngredients<Ingredient[]>();
        setIngredients(data);
      } catch (err) {
        console.error("Failed to fetch ingredients:", err);
      }
    };

    const fetchSaladBases = async () => {
      try {
        const data = await getBaseIngredients<BaseIngredient[]>();
        setSaladBases(data);
      } catch (err) {
        console.error("Failed to fetch base ingredients:", err);
      }
    };

    fetchIngredients();
    fetchSaladBases();
  }, []);

  useEffect(() => {
    const fetchBowls = async () => {
      try {
        const data = await getBowls<Bowl[]>(baseType);
        setBowls(data);
      } catch (error) {
        console.error("Failed to fetch bowls:", error);
      }
    };

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

    fetchBowls();
    fetchCategories();
  }, [baseType]);

  const bases = useMemo<BaseIngredient[]>(() => {
    if (baseType === 1) {
      return saladBases;
    }
    return ingredients
      .filter((ing) => ing.categoryId === 1)
      .map((ing) => ({
        id: ing.id,
        name: ing.name,
        categoryId: ing.categoryId,
        price: ing.price,
      }));
  }, [baseType, saladBases, ingredients]);

  return (
    <div className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4">
      <div className="flex w-full gap-6 items-stretch">
        <div className="flex-[1] min-w-[280px] flex">
        <BowlSelection bowls={bowls} />
        </div>

        <div className="flex-[2] min-w-0">
          <CenterBowl 
          onOpenSaveModal={() => setIsSaveRecipeModalOpen(true)} 
          baseIngredients={saladBases} 
          />
        </div>

        <div className="flex-[1] min-w-[280px] flex">
        {baseType === 2 ? (
          <div className="bg-zinc-800 rounded-[3rem] pt-3 pb-6 px-3 text-white w-full flex flex-col items-center shadow-lg flex-1 min-h-[464px]">
            <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
              2
            </div>

            <h2 className="mb-6 font-semibold text-lg">Valitse salaattipohja</h2>

            <div className="flex flex-1 items-center justify-center text-sm text-gray-400 text-center px-4">
              No base options for quark
            </div>
          </div>
        ) : (
          <BaseSelection bases={bases} />
        )}
        </div>

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
