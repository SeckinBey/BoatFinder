import { memo } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner.jsx";

const DataModal = memo(function DataModal({
  isOpen,
  isSaving,
  editingItem,
  formData,
  formFields,
  onClose,
  onSave,
  onChange,
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 z-40"
        onClick={() => !isSaving && onClose()}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <form onSubmit={onSave}>
            <div className="px-4 pt-5 pb-4 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingItem ? "Düzenle" : "Yeni Ekle"}
              </h3>
              <div className="space-y-4">
                {formFields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                      {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        value={formData[field.name] || ""}
                        onChange={(e) =>
                          onChange({
                            ...formData,
                            [field.name]: e.target.value,
                          })
                        }
                        required={field.required}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isSaving}
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.name] || ""}
                        onChange={(e) =>
                          onChange({
                            ...formData,
                            [field.name]:
                              field.type === "number"
                                ? parseInt(e.target.value) || 0
                                : e.target.value,
                          })
                        }
                        required={field.required}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isSaving}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <LoadingSpinner size="small" />
                    Kaydediliyor...
                  </span>
                ) : editingItem ? (
                  "Güncelle"
                ) : (
                  "Ekle"
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
});

export default DataModal;
