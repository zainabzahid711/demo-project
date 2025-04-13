import { useState, useEffect } from "react";
import { Booking } from "../types/booking";

export default function useBookings() {
  const [state, setState] = useState<{
    bookings: Booking[];
    loading: boolean;
    error: string | null;
  }>({
    bookings: [],
    loading: true,
    error: null,
  });

  const refresh = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const jwt = localStorage.getItem("jwt");

      const res = await fetch(`http://localhost:1337/api/bookings`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch");
      const { data } = await res.json();

      setState({
        bookings: data,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState({
        bookings: [],
        loading: false,
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { ...state, refresh };
}
