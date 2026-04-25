import { create } from 'zustand';

export interface AuthStoreState {
    token: string | null;
    userName: string | null;
    login: (token: string, userName: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
    token: localStorage.getItem("my_real_token"),
    userName: localStorage.getItem("userName"),

    login: (token, userName) => {
        localStorage.setItem("my_real_token", token);
        localStorage.setItem("userName", userName);

        set({
            token,
            userName
        });
    },

    logout: () => {
        localStorage.removeItem("my_real_token");
        localStorage.removeItem("userName");

        set({
            token: null,
            userName: null
        });
    },
}));