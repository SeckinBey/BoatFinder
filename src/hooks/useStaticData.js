import { useQuery } from "@tanstack/react-query";
import {
  getLocations,
  getBoatTypes,
  getAmenities,
  getAddons,
  getFaqs,
} from "../services/staticDataService.js";

/**
 * Static data'yı fetch eden ve cache'leyen hook
 * React Query ile otomatik cache yönetimi
 */
export function useStaticData() {
  const {
    data: locations = [],
    isLoading: isLoadingLocations,
    error: locationsError,
  } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
    staleTime: Infinity, // Static data hiç stale olmasın
    gcTime: 30 * 60 * 1000,
  });

  const {
    data: boatTypes = [],
    isLoading: isLoadingBoatTypes,
    error: boatTypesError,
  } = useQuery({
    queryKey: ["boatTypes"],
    queryFn: getBoatTypes,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
  });

  const {
    data: amenities = [],
    isLoading: isLoadingAmenities,
    error: amenitiesError,
  } = useQuery({
    queryKey: ["amenities"],
    queryFn: getAmenities,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
  });

  const {
    data: addons = [],
    isLoading: isLoadingAddons,
    error: addonsError,
  } = useQuery({
    queryKey: ["addons"],
    queryFn: getAddons,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
  });

  const {
    data: faqs = [],
    isLoading: isLoadingFaqs,
    error: faqsError,
  } = useQuery({
    queryKey: ["faqs"],
    queryFn: getFaqs,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
  });

  const isLoading =
    isLoadingLocations ||
    isLoadingBoatTypes ||
    isLoadingAmenities ||
    isLoadingAddons ||
    isLoadingFaqs;
  const error =
    locationsError ||
    boatTypesError ||
    amenitiesError ||
    addonsError ||
    faqsError;

  return {
    locations,
    boatTypes,
    amenities,
    addons,
    faqs,
    isLoading,
    error,
  };
}
