import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useSearchParams, useParams } from "react-router-dom";
import {
  getLocationById,
  getLocationByName,
  parseDate,
  safeParseInt,
  parseQueryParams,
} from "../utils/helpers.js";
import { QUERY_PARAMS, DATE_FORMATS, DEFAULTS } from "../constants/index.js";
import { useStaticData } from "../hooks/useStaticData.js";

const FilterContext = createContext(null);

export function FilterProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { locationName } = useParams();
  const { locations } = useStaticData();

  // Filter state'leri
  const [selectedLocation, setSelectedLocationState] = useState(null);
  const [departureDate, setDepartureDateState] = useState(null);
  const [boatType, setBoatTypeState] = useState(null);
  const [numberOfPeople, setNumberOfPeopleState] = useState(
    DEFAULTS.NUMBER_OF_PEOPLE
  );
  const [searchTerm, setSearchTermState] = useState("");

  // URL'den state'e sync için ref (infinite loop önlemek için)
  const isSyncingFromURL = useRef(false);

  // URL query params'tan filter state'lerini sync et
  useEffect(() => {
    isSyncingFromURL.current = true;
    const queryParams = parseQueryParams(searchParams);
    const locationId = queryParams.location;
    const date = queryParams.date;
    const people = queryParams.people;

    // Location sync
    if (locationId) {
      const locationIdNum = safeParseInt(locationId);
      const location = getLocationById(locationIdNum, locations);
      if (location) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedLocationState((prev) => {
          if (prev?.id !== location.id) {
            return location;
          }
          return prev;
        });
      }
    } else if (locationName) {
      // Path parametresinden location set et (CardSlider'dan)
      const location = getLocationByName(locationName, locations);
      if (location) {
        setSelectedLocationState((prev) => {
          if (prev?.id !== location.id) {
            return location;
          }
          return prev;
        });
      }
    }

    // Date sync
    if (date) {
      const parsedDate = parseDate(date, DATE_FORMATS.DISPLAY);
      if (parsedDate) {
        setDepartureDateState((prev) => {
          if (!prev || prev.getTime() !== parsedDate.getTime()) {
            return parsedDate;
          }
          return prev;
        });
      }
    }

    // People sync
    if (people !== null && people !== undefined) {
      const peopleNum = safeParseInt(people, DEFAULTS.NUMBER_OF_PEOPLE);
      setNumberOfPeopleState((prev) => {
        if (prev !== peopleNum) {
          return peopleNum;
        }
        return prev;
      });
    }

    // Sync işlemi bitti
    setTimeout(() => {
      isSyncingFromURL.current = false;
    }, 0);
  }, [searchParams, locationName, locations]);

  // State'ten URL'e sync (sadece Explore sayfasındaysa ve URL'den gelmiyorsa)
  useEffect(() => {
    // URL'den sync yapılıyorsa, URL'i güncelleme (infinite loop önlemek için)
    if (isSyncingFromURL.current) return;

    const currentPath = window.location.pathname;
    if (!currentPath.includes("/explore")) return;

    const newParams = new URLSearchParams(searchParams);
    let hasChanges = false;

    // Location sync
    if (selectedLocation?.id) {
      const currentLocationId = searchParams.get(QUERY_PARAMS.LOCATION);
      if (currentLocationId !== String(selectedLocation.id)) {
        newParams.set(QUERY_PARAMS.LOCATION, selectedLocation.id);
        hasChanges = true;
      }
    } else if (
      selectedLocation === null &&
      searchParams.has(QUERY_PARAMS.LOCATION)
    ) {
      newParams.delete(QUERY_PARAMS.LOCATION);
      hasChanges = true;
    }

    // Date sync
    if (departureDate) {
      const formattedDate = departureDate.toISOString().split("T")[0];
      const currentDate = searchParams.get(QUERY_PARAMS.DATE);
      if (currentDate !== formattedDate) {
        newParams.set(QUERY_PARAMS.DATE, formattedDate);
        hasChanges = true;
      }
    } else if (departureDate === null && searchParams.has(QUERY_PARAMS.DATE)) {
      newParams.delete(QUERY_PARAMS.DATE);
      hasChanges = true;
    }

    // People sync
    const currentPeople = searchParams.get(QUERY_PARAMS.PEOPLE);
    if (numberOfPeople !== DEFAULTS.NUMBER_OF_PEOPLE) {
      if (currentPeople !== String(numberOfPeople)) {
        newParams.set(QUERY_PARAMS.PEOPLE, numberOfPeople);
        hasChanges = true;
      }
    } else if (currentPeople) {
      newParams.delete(QUERY_PARAMS.PEOPLE);
      hasChanges = true;
    }

    if (hasChanges) {
      setSearchParams(newParams, { replace: true });
    }
  }, [
    selectedLocation,
    departureDate,
    numberOfPeople,
    searchParams,
    setSearchParams,
  ]);

  // Filter update fonksiyonu (opsiyonel, gerekirse kullanılabilir)
  const updateFilters = useCallback((filters) => {
    if (filters.selectedLocation !== undefined) {
      setSelectedLocationState(filters.selectedLocation);
    }
    if (filters.departureDate !== undefined) {
      setDepartureDateState(filters.departureDate);
    }
    if (filters.boatType !== undefined) {
      setBoatTypeState(filters.boatType);
    }
    if (filters.numberOfPeople !== undefined) {
      setNumberOfPeopleState(filters.numberOfPeople);
    }
    if (filters.searchTerm !== undefined) {
      setSearchTermState(filters.searchTerm);
    }
  }, []);

  // Filter reset fonksiyonu
  const resetFilters = useCallback(() => {
    setSelectedLocationState(null);
    setDepartureDateState(null);
    setBoatTypeState(null);
    setNumberOfPeopleState(DEFAULTS.NUMBER_OF_PEOPLE);
    setSearchTermState("");
  }, []);

  // Individual setters (functional update destekli)
  const setSelectedLocation = useCallback((location) => {
    if (typeof location === "function") {
      setSelectedLocationState((prev) => location(prev));
    } else {
      setSelectedLocationState(location);
    }
  }, []);

  const setDepartureDate = useCallback((date) => {
    if (typeof date === "function") {
      setDepartureDateState((prev) => date(prev));
    } else {
      setDepartureDateState(date);
    }
  }, []);

  const setBoatType = useCallback((type) => {
    if (typeof type === "function") {
      setBoatTypeState((prev) => type(prev));
    } else {
      setBoatTypeState(type);
    }
  }, []);

  const setNumberOfPeople = useCallback((people) => {
    if (typeof people === "function") {
      setNumberOfPeopleState((prev) => people(prev));
    } else {
      setNumberOfPeopleState(people);
    }
  }, []);

  const setSearchTerm = useCallback((term) => {
    if (typeof term === "function") {
      setSearchTermState((prev) => term(prev));
    } else {
      setSearchTermState(term);
    }
  }, []);

  return (
    <FilterContext.Provider
      value={{
        // State
        selectedLocation,
        departureDate,
        boatType,
        numberOfPeople,
        searchTerm,
        // Setters
        setSelectedLocation,
        setDepartureDate,
        setBoatType,
        setNumberOfPeople,
        setSearchTerm,
        // Functions
        updateFilters,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within FilterProvider");
  }
  return context;
}
