import { create } from 'zustand';

export interface AuthStoreState {
    token: string | null;
    userName: string | null;
    login: (token: string, userName: string) => void;
    logout: () => void;
}

const storedToken = localStorage.getItem("my_real_token");
const storedUserName = localStorage.getItem("userName");

// If a token exists without a userName the session is invalid — clear it
if (storedToken && !storedUserName) {
    localStorage.removeItem("my_real_token");
}

export const useAuthStore = create<AuthStoreState>((set) => ({
    token: storedToken && storedUserName ? storedToken : null,
    userName: storedUserName,

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