import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    isAuthenticated: boolean;
    username: string | null;
    login: (username: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(

    persist(
        (set) => ({
            isAuthenticated: false,
            username: null,

            login: (name: string) => {
                const normalizedName = name.trim() || 'Guest Trader';
                set({ isAuthenticated: true, username: normalizedName });
            },

            logout: () => {
                set({ isAuthenticated: false, username: null });
            },
        }),
        {
            name: 'demo-terminal-session',
        }
    )
);