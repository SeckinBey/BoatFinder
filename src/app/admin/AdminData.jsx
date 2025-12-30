import { useState, useCallback, useMemo } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CONFIRM_TEXTS } from "../../constants/index.js";
import { useConfirm } from "../../hooks/useConfirm.js";
import ConfirmDialog from "../../components/ConfirmDialog.jsx";
import { useToastContext } from "../../context/ToastContext.jsx";
import {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
  getBoatTypes,
  createBoatType,
  updateBoatType,
  deleteBoatType,
  getAmenities,
  createAmenity,
  updateAmenity,
  deleteAmenity,
  getCaptains,
  createCaptain,
  updateCaptain,
  deleteCaptain,
  getBoatOwners,
  createBoatOwner,
  updateBoatOwner,
  deleteBoatOwner,
} from "../../services/staticDataService.js";
import TabNavigation from "./components/TabNavigation.jsx";
import TabContent from "./components/TabContent.jsx";
import DataModal from "./components/DataModal.jsx";
import {
  MapPinIcon,
  CubeIcon,
  SparklesIcon,
  UserIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

export default function AdminData() {
  const queryClient = useQueryClient();

  // State management
  const [activeTab, setActiveTab] = useState("locations");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const { success, error: errorToast } = useToastContext();
  const { confirm, confirmState, handleConfirm, handleCancel } = useConfirm();

  const tabs = useMemo(
    () => [
      { id: "locations", label: "Lokasyonlar", icon: MapPinIcon },
      { id: "boatTypes", label: "Tekne Tipleri", icon: CubeIcon },
      { id: "amenities", label: "Özellikler", icon: SparklesIcon },
      { id: "captains", label: "Kaptanlar", icon: UserIcon },
      { id: "boatOwners", label: "Tekne Sahipleri", icon: BuildingOfficeIcon },
    ],
    []
  );

  // Query key mapping
  const queryKeyMap = useMemo(
    () => ({
      locations: ["locations"],
      boatTypes: ["boatTypes"],
      amenities: ["amenities"],
      captains: ["captains"],
      boatOwners: ["boatOwners"],
    }),
    []
  );

  // Fetch function mapping
  const fetchFunctions = useMemo(
    () => ({
      locations: getLocations,
      boatTypes: getBoatTypes,
      amenities: getAmenities,
      captains: getCaptains,
      boatOwners: getBoatOwners,
    }),
    []
  );

  // CRUD function mappings
  const crudFunctions = useMemo(
    () => ({
      locations: {
        create: createLocation,
        update: updateLocation,
        delete: deleteLocation,
      },
      boatTypes: {
        create: createBoatType,
        update: updateBoatType,
        delete: deleteBoatType,
      },
      amenities: {
        create: createAmenity,
        update: updateAmenity,
        delete: deleteAmenity,
      },
      captains: {
        create: createCaptain,
        update: updateCaptain,
        delete: deleteCaptain,
      },
      boatOwners: {
        create: createBoatOwner,
        update: updateBoatOwner,
        delete: deleteBoatOwner,
      },
    }),
    []
  );

  // Form fields mapping
  const formFieldsMap = useMemo(
    () => ({
      locations: [
        { name: "name", label: "İsim", type: "text", required: true },
        { name: "title", label: "Başlık", type: "text", required: true },
        {
          name: "imageUrl",
          label: "Görsel URL",
          type: "text",
          required: false,
        },
      ],
      boatTypes: [
        { name: "name", label: "İsim", type: "text", required: true },
      ],
      amenities: [
        { name: "name", label: "İsim", type: "text", required: true },
      ],
      captains: [
        { name: "firstName", label: "Ad", type: "text", required: true },
        { name: "lastName", label: "Soyad", type: "text", required: true },
        { name: "phone", label: "Telefon", type: "text", required: true },
      ],
      boatOwners: [
        { name: "firstName", label: "Ad", type: "text", required: true },
        { name: "lastName", label: "Soyad", type: "text", required: true },
        { name: "phone", label: "Telefon", type: "text", required: true },
      ],
    }),
    []
  );

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async ({ type, data }) => {
      const createFn = crudFunctions[type]?.create;
      if (!createFn) throw new Error("Create function not found");
      return await createFn(data);
    },
    onSuccess: (_, variables) => {
      const queryKey = queryKeyMap[variables.type];
      queryClient.invalidateQueries({ queryKey }); // Cache'i invalidate et
      success("Kayıt başarıyla eklendi");
    },
    onError: (error) => {
      console.error("Error creating item:", error);
      errorToast("Kayıt işlemi başarısız oldu");
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ type, id, data }) => {
      const updateFn = crudFunctions[type]?.update;
      if (!updateFn) throw new Error("Update function not found");
      return await updateFn(id, data);
    },
    onSuccess: (_, variables) => {
      const queryKey = queryKeyMap[variables.type];
      queryClient.invalidateQueries({ queryKey }); // Cache'i invalidate et
      success("Kayıt başarıyla güncellendi");
    },
    onError: (error) => {
      console.error("Error updating item:", error);
      errorToast("Güncelleme işlemi başarısız oldu");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async ({ type, id }) => {
      const deleteFn = crudFunctions[type]?.delete;
      if (!deleteFn) throw new Error("Delete function not found");
      return await deleteFn(id);
    },
    onSuccess: (_, variables) => {
      const queryKey = queryKeyMap[variables.type];
      queryClient.invalidateQueries({ queryKey }); // Cache'i invalidate et
      success("Kayıt başarıyla silindi");
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
      errorToast("Silme işlemi başarısız oldu");
    },
  });

  // Memoized callbacks
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  const handleAdd = useCallback(() => {
    setEditingItem(null);
    setFormData({});
    setIsModalOpen(true);
  }, []);

  const handleEdit = useCallback((item) => {
    setEditingItem(item);
    // Transform Supabase data to form data
    const formDataTransformed = { ...item };
    if (item.first_name) {
      formDataTransformed.firstName = item.first_name;
    }
    if (item.last_name) {
      formDataTransformed.lastName = item.last_name;
    }
    if (item.image_url) {
      formDataTransformed.imageUrl = item.image_url;
    }
    setFormData(formDataTransformed);
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      const result = await confirm({
        title: "Kaydı Sil",
        message: CONFIRM_TEXTS.DELETE_ITEM,
        variant: "danger",
        confirmText: "Sil",
        cancelText: "İptal",
      });

      if (!result) return;

      deleteMutation.mutate({ type: activeTab, id });
    },
    [activeTab, confirm, deleteMutation]
  );

  const handleSave = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSaving(true);

      try {
        if (editingItem) {
          await updateMutation.mutateAsync({
            type: activeTab,
            id: editingItem.id,
            data: formData,
          });
        } else {
          await createMutation.mutateAsync({
            type: activeTab,
            data: formData,
          });
        }

        setIsModalOpen(false);
        setFormData({});
        setEditingItem(null);
      } catch (err) {
        // Error handling mutation'ların onError'unda yapılıyor
      } finally {
        setIsSaving(false);
      }
    },
    [activeTab, editingItem, formData, createMutation, updateMutation]
  );

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setFormData({});
    setEditingItem(null);
  }, []);

  const fetchFunction = useMemo(
    () => fetchFunctions[activeTab],
    [activeTab, fetchFunctions]
  );

  const isSavingMutation = createMutation.isPending || updateMutation.isPending;

  return (
    <>
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        onClose={handleCancel}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        title={confirmState.title}
        message={confirmState.message}
        variant={confirmState.variant}
        confirmText={confirmState.confirmText}
        cancelText={confirmState.cancelText}
      />
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Veri Yönetimi</h1>
            <p className="text-sm text-gray-500 mt-1">
              Lokasyonlar, tekne tipleri, özellikler ve diğer verileri yönetin
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Yeni Ekle</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200">
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          {/* Table Content */}
          <TabContent
            activeTab={activeTab}
            fetchFunction={fetchFunction}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Modal */}
        <DataModal
          isOpen={isModalOpen}
          isSaving={isSavingMutation}
          editingItem={editingItem}
          formData={formData}
          formFields={formFieldsMap[activeTab] || []}
          onClose={handleModalClose}
          onSave={handleSave}
          onChange={setFormData}
        />
      </div>
    </>
  );
}
