import Button from "@/components/Button";
import { FaPlus } from "react-icons/fa";

interface PageHeaderProps {
    title: string;
    subtitle: string;
    type: 'events' | 'users' | 'categories';
    total: number;
    onCreate: () => void;
}

export function PageHeader(props: PageHeaderProps) {
    const { title, subtitle, type, total, onCreate } = props;

    return (
        <div className="w-full px-8 py-10 bg-linear-to-b from-[#681A20] to-[#9E2A33] rounded-xl flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
            <div className="flex flex-col">
            <p className="text-white/80 text-xs font-semibold tracking-wider uppercase mb-1">
                {subtitle}
            </p>
            <h1 className="text-white text-heading-1 font-bold">
                {title}
            </h1>
            <div className="mt-4 flex items-baseline gap-2">
                <span className="text-white text-3xl font-bold">{total}</span>
                <span className="text-white/70 text-sm capitalize">Total {type}</span>
            </div>
            </div>
            <Button 
                bgColorClass="bg-brand-red"
                className="px-6 py-3 flex items-center justify-center gap-2 rounded-xl text-button-md font-semibold text-white shadow-resting hover:shadow-raised transition-all"
                onClick={onCreate}
            >
            <FaPlus size={14} />
                Create {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
        </div>
    );
}

export default PageHeader;