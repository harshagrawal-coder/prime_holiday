import { useEffect, useMemo, useState } from "react";
import locationData from "../data/locationData.json";

const FILTERS_STORAGE_KEY = "prime-holiday-tour-filters";

const parsePrice = (priceStr) => {
  const numbers = priceStr?.match(/\d[\d,]*/g) || [];
  const lastValue = numbers[numbers.length - 1];
  return lastValue ? parseInt(lastValue.replace(/,/g, ""), 10) : 0;
};

const getInitialFilters = () => {
  try {
    const saved = localStorage.getItem(FILTERS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        selectedRegion: parsed.selectedRegion || "",
        selectedStates: parsed.selectedStates || [],
        selectedCities: parsed.selectedCities || [],
        selectedDays: parsed.selectedDays || "All Durations",
        priceRange: parsed.priceRange || 150000,
      };
    }
  } catch (e) {
    console.log("Using default filters");
  }
  return {
    selectedRegion: "",
    selectedStates: [],
    selectedCities: [],
    selectedDays: "All Durations",
    priceRange: 150000,
  };
};

const saveFilters = (filters) => {
  try {
    localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters));
  } catch (e) {
    console.log("Could not save filters");
  }
};

export const useTourFilters = ({ selectedVibeExternal, tours = [] } = {}) => {
  const initialFilters = getInitialFilters();
  
  const [selectedRegion, setSelectedRegion] = useState(initialFilters.selectedRegion);
  const [selectedStates, setSelectedStates] = useState(initialFilters.selectedStates);
  const [selectedCities, setSelectedCities] = useState(initialFilters.selectedCities);
  const [selectedDays, setSelectedDays] = useState(initialFilters.selectedDays);
  const [selectedVibeState, setSelectedVibe] = useState("All Vibes");
  const [priceRange, setPriceRange] = useState(initialFilters.priceRange);
  const selectedVibe = selectedVibeExternal ?? selectedVibeState;

  useEffect(() => {
    const filters = {
      selectedRegion,
      selectedStates,
      selectedCities,
      selectedDays,
      priceRange,
    };
    saveFilters(filters);
  }, [selectedRegion, selectedStates, selectedCities, selectedDays, priceRange]);

  const allStatesFlattened = useMemo(() => Object.values(locationData).flat(), []);

  const displayStates = useMemo(
    () => (selectedRegion ? locationData[selectedRegion] || [] : allStatesFlattened),
    [selectedRegion, allStatesFlattened]
  );

  const displayCities = useMemo(() => {
    if (selectedStates.length > 0) {
      return allStatesFlattened
        .filter((state) => selectedStates.includes(state.state))
        .flatMap((state) => state.cities);
    }

    if (selectedRegion) {
      return (locationData[selectedRegion] || []).flatMap((state) => state.cities);
    }

    return allStatesFlattened.flatMap((state) => state.cities);
  }, [selectedStates, selectedRegion, allStatesFlattened]);

  const resetFilters = () => {
    setSelectedRegion("");
    setSelectedStates([]);
    setSelectedCities([]);
    setSelectedDays("All Durations");
    setSelectedVibe("All Vibes");
    setPriceRange(150000);
    localStorage.removeItem(FILTERS_STORAGE_KEY);
  };

  const filteredTours = useMemo(
    () =>
      tours.filter((tour) => {
        const matchVibe =
          selectedVibe === "All Vibes" || tour.mood?.toLowerCase() === selectedVibe.toLowerCase();
        const matchRegion = !selectedRegion || tour.region === selectedRegion;
        const matchState = selectedStates.length === 0 || selectedStates.includes(tour.state);
        const matchCity = selectedCities.length === 0 || selectedCities.includes(tour.city);
        const tourDays = tour.days?.toLowerCase() || "";
        const matchDays =
          selectedDays === "All Durations" ||
          (selectedDays === "Same Day" && tourDays.includes("same")) ||
          (selectedDays === "2-3 Days" && (tourDays.includes("2") || tourDays.includes("3"))) ||
          (selectedDays === "4+ Days" && parseInt(tourDays, 10) >= 4);

        return (
          matchVibe &&
          matchRegion &&
          matchState &&
          matchCity &&
          matchDays &&
          parsePrice(tour.priceRange) <= priceRange
        );
      }),
    [priceRange, selectedCities, selectedDays, selectedRegion, selectedStates, selectedVibe, tours]
  );

  return {
    selectedRegion,
    setSelectedRegion,
    selectedStates,
    setSelectedStates,
    selectedCities,
    setSelectedCities,
    selectedDays,
    setSelectedDays,
    selectedVibe,
    setSelectedVibe,
    priceRange,
    setPriceRange,
    filteredTours,
    displayStates,
    displayCities,
    resetFilters,
  };
};