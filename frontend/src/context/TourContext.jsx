import { createContext, useCallback, useContext, useMemo, useState } from "react";
import toursData from "../data/toursData.json";
import { logActivity } from "../utils/activityLogger";

const TOUR_STORAGE_KEY = "prime-holiday-tours";

const TourContext = createContext(null);

const createLocalId = (prefix) => globalThis.crypto?.randomUUID?.() ?? `${prefix}-${Date.now()}`;

const readStoredTours = () => {
  try {
    const stored = localStorage.getItem(TOUR_STORAGE_KEY);
    return stored ? JSON.parse(stored) : toursData;
  } catch {
    return toursData;
  }
};

const getTrimmedValue = (value) => (typeof value === "string" ? value.trim() : value ?? "");

const getEditablePrice = (tour = {}) => {
  if (tour.price) return getTrimmedValue(tour.price);
  const matchedPrice = String(tour.priceRange || "").match(/\d[\d,]*/);
  return matchedPrice ? matchedPrice[0] : "";
};

const normalizeTourPayload = (tour, existingTour = {}) => {
  const price = getTrimmedValue(tour.price) || getEditablePrice(existingTour);
  const description = getTrimmedValue(tour.prec ?? tour.description ?? existingTour.prec);
  const bestTimeToVisit = getTrimmedValue(
    tour.bestTimeToVisit ?? tour.bestTime ?? existingTour.bestTimeToVisit
  );
  const image = getTrimmedValue(tour.image ?? existingTour.image);

  return {
    ...existingTour,
    ...tour,
    name: getTrimmedValue(tour.name ?? existingTour.name),
    city: getTrimmedValue(tour.city ?? existingTour.city),
    state: getTrimmedValue(tour.state ?? existingTour.state),
    region: getTrimmedValue(tour.region ?? existingTour.region),
    mood: getTrimmedValue(tour.mood ?? existingTour.mood),
    days: getTrimmedValue(tour.days ?? existingTour.days),
    image,
    price,
    priceRange: price ? `₹${price}` : getTrimmedValue(tour.priceRange ?? existingTour.priceRange),
    prec: description,
    description,
    bestTimeToVisit,
    bestTime: bestTimeToVisit,
    topAttractions: Array.isArray(tour.topAttractions)
      ? tour.topAttractions
      : existingTour.topAttractions || [],
    rating: tour.rating ?? existingTour.rating ?? "New",
    trending: tour.trending ?? existingTour.trending ?? false,
  };
};

export const TourProvider = ({ children }) => {
  const [tours, setTours] = useState(readStoredTours);

  const addTour = useCallback((newTour) => {
    const tourWithId = {
      ...normalizeTourPayload(newTour),
      id: createLocalId("tour"),
    };

    setTours((currentTours) => {
      const updatedTours = [tourWithId, ...currentTours];
      localStorage.setItem(TOUR_STORAGE_KEY, JSON.stringify(updatedTours));
      return updatedTours;
    });

    logActivity(`Created new tour: ${tourWithId.name}`);
  }, []);

  const deleteTour = useCallback((id) => {
    let tourName = "a tour";

    setTours((currentTours) => {
      tourName = currentTours.find((tour) => tour.id === id)?.name || tourName;
      const updatedTours = currentTours.filter((tour) => tour.id !== id);
      localStorage.setItem(TOUR_STORAGE_KEY, JSON.stringify(updatedTours));
      return updatedTours;
    });

    logActivity(`Deleted tour: ${tourName}`);
  }, []);

  const editTour = useCallback((updatedTour) => {
    setTours((currentTours) => {
      const updatedTours = currentTours.map((tour) =>
        tour.id === updatedTour.id ? normalizeTourPayload(updatedTour, tour) : tour
      );
      localStorage.setItem(TOUR_STORAGE_KEY, JSON.stringify(updatedTours));
      return updatedTours;
    });

    logActivity(`Updated tour details: ${updatedTour.name}`);
  }, []);

  const value = useMemo(
    () => ({ tours, addTour, deleteTour, editTour }),
    [addTour, deleteTour, editTour, tours]
  );

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
};

export const useTours = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTours must be used within TourProvider");
  }
  return context;
};
