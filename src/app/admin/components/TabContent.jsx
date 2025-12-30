import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "./DataTable.jsx";

const TabContent = memo(function TabContent({
  activeTab,
  fetchFunction,
  onEdit,
  onDelete,
}) {
  // Query key mapping
  const queryKeys = {
    locations: ["locations"],
    boatTypes: ["boatTypes"],
    amenities: ["amenities"],
    captains: ["captains"],
    boatOwners: ["boatOwners"],
  };

  const queryKey = queryKeys[activeTab] || [];

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: fetchFunction,
    enabled: !!fetchFunction, // Sadece fetchFunction varsa fetch et
    staleTime: 30 * 60 * 1000, // 30 dakika - admin data için uzun süre fresh
    refetchOnWindowFocus: false, // Window focus'ta refetch yapma
  });

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded m-4">
        {error?.message || "Veriler yüklenirken bir hata oluştu"}
      </div>
    );
  }

  return (
    <DataTable
      activeTab={activeTab}
      data={data}
      onEdit={onEdit}
      onDelete={onDelete}
      isLoading={isLoading}
    />
  );
});

export default TabContent;
