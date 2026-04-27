import {create } from "zustand";
import { getPrices } from "../services/api";

export interface PriceApiItem {
    item_id: number;
    name: string;
    price: number;
}

export interface PriceListItem {
    id: number;
    name?: string;
    price: number;
}

export interface PriceStoreState {
    prices: PriceListItem[];
    fetchPrices: (token: string) => Promise<void>;
}

export const usePriceStore = create<PriceStoreState>((set) => ({
    prices: [],

    fetchPrices: async (token) => {
        try {
            const data = await getPrices<PriceApiItem[]>(token);

            const normalized: PriceListItem[] = data.map(p => ({
                id: p.item_id,
                price: p.price
            }));

            set({prices: normalized });
        } catch (error) {
            console.error("Failed to fetch prices", error);

        }
    },
}));