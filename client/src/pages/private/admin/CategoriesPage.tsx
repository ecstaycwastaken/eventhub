import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin";
import CategoryCard from "@/components/admin/CategoryCard";
import AdminCategoryModal from "@/components/admin/categories/AdminCategoryModal";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal";
import { useHttp } from "@/hooks";
import type { Category } from "@/types/category";

function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);

  const { 
    loading: categoriesLoading, 
    error: categoriesError, 
    sendRequest: getCategories,
    data: categoriesResponse
  } = useHttp<Category[]>();

  const { sendRequest: deleteCategoryRequest, loading: isDeletingCategory } = useHttp();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    getCategories({
      method: 'GET',
      url: `/api/v1/categories`,
    });
  };

  const categories = useMemo(() => {
    return Array.isArray(categoriesResponse) ? categoriesResponse : [];
  }, [categoriesResponse]);

  const handleCreate = () => {
    setCategoryToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setCategoryToEdit(category);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteCategoryId) return;
    try {
      const response = await deleteCategoryRequest({
        method: 'DELETE',
        url: `/api/v1/categories/${deleteCategoryId}`
      });
      if (response) {
        toast.success("Category deleted successfully!", {
          classNames: {
            toast: 'bg-[#F1FFEB] text-[#44A872] font-dm font-medium rounded-xl border border-[#44A872]'
          }
        });
        setDeleteCategoryId(null);
        fetchCategories();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete category. Please try again.");
    }
  };

  const handleModalSuccess = () => {
    setIsModalOpen(false);
    fetchCategories();
  };

  return (
    <div className="flex flex-col h-full font-dm pb-10">
      <PageHeader 
        title="Categories" 
        subtitle="Manage event categories and colors"
        type="categories"
        total={categories.length}
        onCreate={handleCreate}
      />

      {categoriesLoading && categories.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E63946]"></div>
        </div>
      ) : categoriesError ? (
        <div className="text-center py-20 text-brand-red">
          <p>Failed to load categories. Please try again.</p>
          <button onClick={fetchCategories} className="mt-4 underline text-sm">Retry</button>
        </div>
      ) : categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p>No categories found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((c) => (
            <CategoryCard
              key={c.id}
              category={c}
              onEdit={handleEdit}
              onDelete={setDeleteCategoryId}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <AdminCategoryModal 
          key={categoryToEdit ? categoryToEdit.id : 'new'}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleModalSuccess}
          categoryToEdit={categoryToEdit}
        />
      )}

      <DeleteConfirmationModal
        isOpen={!!deleteCategoryId}
        title="Delete Category"
        description="Are you sure you want to delete this category? Events using this category might be affected."
        isDeleting={isDeletingCategory}
        onCancel={() => setDeleteCategoryId(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

export default CategoriesPage;