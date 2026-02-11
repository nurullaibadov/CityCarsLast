import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesStore {
    favorites: number[];
    addFavorite: (carId: number) => void;
    removeFavorite: (carId: number) => void;
    isFavorite: (carId: number) => boolean;
    toggleFavorite: (carId: number) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
    persist(
        (set, get) => ({
            favorites: [],
            addFavorite: (carId) =>
                set((state) => ({
                    favorites: [...state.favorites, carId],
                })),
            removeFavorite: (carId) =>
                set((state) => ({
                    favorites: state.favorites.filter((id) => id !== carId),
                })),
            isFavorite: (carId) => get().favorites.includes(carId),
            toggleFavorite: (carId) => {
                const { isFavorite, addFavorite, removeFavorite } = get();
                if (isFavorite(carId)) {
                    removeFavorite(carId);
                } else {
                    addFavorite(carId);
                }
            },
        }),
        {
            name: 'favorites-storage',
        }
    )
);
