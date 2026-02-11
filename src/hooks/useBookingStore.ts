import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Car {
    id: number;
    name: string;
    category: string;
    image: string;
    price: number;
    seats: number;
    fuel: string;
    transmission: string;
    rating: number;
}

export interface BookingDetails {
    car: Car;
    pickupLocation: string;
    returnLocation: string;
    pickupDate: string;
    returnDate: string;
    addOns: string[];
    totalPrice: number;
}

interface BookingStore {
    currentBooking: BookingDetails | null;
    setBooking: (booking: BookingDetails) => void;
    clearBooking: () => void;
}

export const useBookingStore = create<BookingStore>()(
    persist(
        (set) => ({
            currentBooking: null,
            setBooking: (booking) => set({ currentBooking: booking }),
            clearBooking: () => set({ currentBooking: null }),
        }),
        {
            name: 'booking-storage',
        }
    )
);
