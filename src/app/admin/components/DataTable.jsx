import { memo } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const DataTable = memo(function DataTable({
  activeTab,
  data,
  onEdit,
  onDelete,
  isLoading,
}) {
  const renderTableHeaders = () => {
    switch (activeTab) {
      case "locations":
        return (
          <>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              İsim
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Başlık
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Görsel URL
            </th>
          </>
        );
      case "boatTypes":
      case "amenities":
        return (
          <>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              İsim
            </th>
          </>
        );
      case "captains":
      case "boatOwners":
        return (
          <>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Ad
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Soyad
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Telefon
            </th>
          </>
        );
      default:
        return null;
    }
  };

  const renderTableRows = () => {
    return data.map((item) => (
      <tr key={item.id} className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {item.id}
        </td>
        {activeTab === "locations" && (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.title}
            </td>
            <td className="px-6 py-4 text-sm text-gray-900">
              <div className="max-w-md truncate">
                {item.image_url || item.imageUrl || "-"}
              </div>
            </td>
          </>
        )}
        {(activeTab === "boatTypes" || activeTab === "amenities") && (
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {item.name}
          </td>
        )}
        {(activeTab === "captains" || activeTab === "boatOwners") && (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.first_name || item.firstName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.last_name || item.lastName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.phone}
            </td>
          </>
        )}
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => onEdit(item)}
              className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
              title="Düzenle"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="text-red-600 hover:text-red-900 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
              title="Sil"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {renderTableHeaders()}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td colSpan={100} className="px-6 py-12 text-center">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {renderTableHeaders()}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td
                colSpan={100}
                className="px-6 py-12 text-center text-gray-500"
              >
                Henüz veri bulunmuyor
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {renderTableHeaders()}
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {renderTableRows()}
        </tbody>
      </table>
    </div>
  );
});

export default DataTable;
