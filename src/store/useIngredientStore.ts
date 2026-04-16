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
    setBaseType: (id) => set({ baseType: id, selectedBowl: null, slots: {},}),
    setBowl: (bowl) => set({ selectedBowl: bowl, slots: {},}),
    clearSelection: () => set({ slots: {}, selectedBowl: null }),

    addIngredient: (item) => {
        set((state) => {
            if (item.categoryId === 6) {
                return {
                    slots: {
                        ...state.slots,
                        "base": item
                    }
                };
            }

            const bowl = state.selectedBowl;
            if (!bowl || !bowl.slot_count) {
                return state;
            }

            const newSlots = { ...state.slots };

            for (let i = 1; i <= bowl.slot_count; i++) {
                const slotKey = `slot-${i}`;
                if (!newSlots[slotKey]) {
                    newSlots[slotKey] = item;
                    return { slots: newSlots };
                }
            }

            return state;
        });
    },

    removeIngredient: (id) => {
        set((state) => {
            const newSlots = { ...state.slots };
            const keyToRemove = Object.keys(newSlots).find(
                (key) => newSlots[key]?.id === id
            );
            if (keyToRemove) {
                newSlots[keyToRemove] = null;
            }
            return { slots: newSlots };
        });

    },
}));