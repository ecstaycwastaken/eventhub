import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { HexColorPicker } from "react-colorful";
import Button from "@/components/Button";
import { useHttp } from "@/hooks";
import { toast } from "sonner";
import type { Category } from "@/types/category";

interface AdminCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categoryToEdit?: Category | null;
}

export function AdminCategoryModal({ isOpen, onClose, onSuccess, categoryToEdit }: AdminCategoryModalProps) {
  const [name, setName] = useState(categoryToEdit?.name || "");
  const [color, setColor] = useState(categoryToEdit?.color || "#2F5FDB");
  const [showPicker, setShowPicker] = useState(false);

  const { sendRequest, loading } = useHttp();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !color) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const url = categoryToEdit 
        ? `/api/v1/categories/${categoryToEdit.id}` 
        : `/api/v1/categories`;
      const method = categoryToEdit ? 'PUT' : 'POST';

      const response = await sendRequest({
        method,
        url,
        data: { name, color }
      });

      if (response) {
        toast.success(`Category ${categoryToEdit ? 'updated' : 'created'} successfully!`, {
          classNames: {
            toast: 'bg-[#F1FFEB] text-[#44A872] font-dm font-medium rounded-xl border border-[#44A872]'
          }
        });
        onSuccess();
      }
    } catch (err: unknown) {
      toast.error((err as Error).message || `Failed to ${categoryToEdit ? 'update' : 'create'} category.`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 overflow-y-auto font-dm">
      <div className="relative w-full max-w-md bg-white rounded-[16px] shadow-overlay p-6">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-ink transition-colors p-2 rounded-full hover:bg-gray-100"
        >
          <FaTimes size={16} />
        </button>

        <h2 className="text-[24px] font-bold text-ink mb-6">
          {categoryToEdit ? "Edit Category" : "Create Category"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-[14px] font-medium text-gray-600">Category name</label>
            <input 
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-sm border border-border-strong px-4 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-action-secondary/30 focus:border-action-secondary"
              placeholder="e.g. Technology"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="color" className="text-[14px] font-medium text-gray-600">Color</label>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 flex-wrap">
                {[
                  "#2F5FDB", // Blue
                  "#8B5CF6", // Violet
                  "#0D9488", // Teal
                  "#D97706", // Amber
                  "#4F46E5", // Indigo
                  "#DB2777", // Rose
                  "#DC2626", // Red
                ].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setColor(preset)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                      color.toUpperCase() === preset.toUpperCase() 
                        ? "border-gray-800 scale-110 shadow-sm" 
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: preset }}
                    aria-label={`Select color ${preset}`}
                  />
                ))}
              </div>
              <div className="flex gap-3 items-center relative">
                <div>
                  <button
                    type="button"
                    onClick={() => setShowPicker(!showPicker)}
                    className="w-10 h-10 rounded-sm cursor-pointer border border-border-strong shrink-0"
                    style={{ backgroundColor: color }}
                    aria-label="Pick custom color"
                  />
                  {showPicker && (
                    <div className="absolute z-10 top-12 left-0 shadow-raised rounded-xl bg-white p-2 border border-border-strong">
                      <div className="flex justify-end mb-2">
                        <button type="button" onClick={() => setShowPicker(false)} className="text-gray-400 hover:text-ink"><FaTimes size={12}/></button>
                      </div>
                      <HexColorPicker color={color} onChange={setColor} />
                    </div>
                  )}
                </div>
                <input 
                  id="color"
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full rounded-sm border border-border-strong px-4 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-action-secondary/30 focus:border-action-secondary uppercase font-mono"
                  placeholder="#000000"
                  pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex w-full gap-3 mt-4">
            <Button 
              type="button"
              className="flex-1 py-3 rounded-xl border-[1.5px] border-border-strong text-ink font-semibold text-[15px] hover:bg-gray-50 transition-colors"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              bgColorClass="bg-[#2F5FDB]"
              className="flex-1 py-3 rounded-xl text-white font-semibold text-[15px] hover:bg-[#254ab8] transition-colors shadow-resting"
              disabled={loading}
            >
              {loading ? "Saving..." : (categoryToEdit ? "Save Changes" : "Create")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminCategoryModal;
