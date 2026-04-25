import {create } from "zustand";
import { getPrices } from "../services/api";

export interface PriceListItem {
    id: number;
    name: string;
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
            const data = await getPrices<PriceListItem[]>(token);
            set({prices: data });
        } catch (error) {
            console.error("Failed to fetch prices", error);

        }
    },
}));