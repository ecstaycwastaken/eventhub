import Button from "@/components/Button";

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    title: string;
    description: string;
    isDeleting: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function DeleteConfirmationModal({
    isOpen,
    title,
    description,
    isDeleting,
    onCancel,
    onConfirm
}: DeleteConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 overflow-y-auto no-scrollbar">
            <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 flex flex-col gap-4 text-center">
                <h2 className="text-heading-3 text-black">{title}</h2>
                <p className="text-body-2 text-gray">
                    {description}
                </p>
                <div className="flex flex-col-reverse sm:flex-row gap-3 mt-4">
                    <Button 
                        bgColorClass="bg-transparent" 
                        textColorClass="text-black" 
                        className="border border-gray rounded-xl py-2.5 flex-1" 
                        type="button"
                        onClick={onCancel}
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>
                    <Button 
                        bgColorClass="bg-[#E8313A]" 
                        className="rounded-xl py-2.5 flex-1 disabled:opacity-70 text-white" 
                        type="button"
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Confirm Delete"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
