import { create } from 'zustand';

import type { Bowl, Ingredient } from '../types';

export interface IngredientStoreState {
	slots: Record<string, Ingredient | null>;
	baseType: number;
	selectedBowl: Bowl | null;
	setBaseType: (id: number) => void;
	setBowl: (bowl: Bowl | null) => void;
	clearSelection: () => void;
	addIngredient: (item: Ingredient) => void;
	removeIngredient: (id: number) => void;
}

export const useIngredientStore = create<IngredientStoreState>((set) => ({
	slots: {},
	baseType: 1,
	selectedBowl: null,
	setBaseType: (id) => set({ baseType: id }),
	setBowl: (bowl) => set({ selectedBowl: bowl }),
	clearSelection: () => set({ slots: {}, selectedBowl: null }),

	// "_param" = intentionally unused for now as these are placeholders.
	addIngredient: (_item) => {
		// Placeholder
	},
	removeIngredient: (_id) => {
		// Placeholder
	},
}));
