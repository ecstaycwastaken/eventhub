import { useEffect } from 'react';
import QRCode from "react-qr-code";
import { useHttp } from '@/hooks/useHttp';
import { toast } from 'sonner';
import { FiCalendar, FiMapPin, FiCopy } from 'react-icons/fi';
import type { EventWithCategory } from "@/types/event";
import Button from '../Button';
import { Spinner } from '@/components/ui/spinner';
import heroBG from '@/assets/hero-bg.png';


interface ViewPassModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: EventWithCategory;
}

export default function ViewPassModal({ isOpen, onClose, event }: ViewPassModalProps) {
    const { data, loading, sendRequest } = useHttp<{ event_pass: any }>();

    useEffect(() => {
        if (isOpen) {
            sendRequest({ 
                method: 'GET', 
                url: `/api/v1/event/view-pass/${event.id}` 
            });
        }
    }, [isOpen, event.id, sendRequest]);

    if (!isOpen) return null;

    const passData = data?.event_pass;
    const code = passData?.code || (event as any).code || 'Loading...';
    
    const date = new Date(event.date);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    const handleCopyCode = () => {
        navigator.clipboard.writeText(code);
        toast.success("Code copied to clipboard!");
    };

    return (
        <div className="fixed font-dm inset-0 z-60 flex items-center justify-center bg-black/70 p-4 md:p-6 overflow-hidden">
            <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl flex flex-col max-h-[95vh] overflow-hidden animate-in zoom-in-95 duration-200 relative">
                <div className="relative h-32 w-full shrink-0">
                    <img
                        src={event.banner_image || heroBG}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <Button
                        bgColorClass="bg-black/50"
                        className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full"
                        onClick={onClose}
                    >
                        &times;
                    </Button>
                    <div className="absolute bottom-3 left-4">
                        <span className="bg-[#3B82F6] text-white text-sub-1 px-3 py-1 rounded-full shadow-sm">
                            {event.category?.name || 'Uncategorized'}
                        </span>
                    </div>
                </div>

                <div className="p-6 flex flex-col overflow-y-auto">
                    <h2 className="text-heading-2 font-bold text-gray-900 leading-tight mb-4">
                        {event.title}
                    </h2>
                    
                    <div className="flex flex-col gap-2 mb-6">
                        <p className="flex items-center gap-3 text-caption-2 text-gray-500 font-medium">
                            <FiCalendar size={16} className="text-gray-400 shrink-0" />
                            {formattedDate} · {formattedTime}
                        </p>
                        <p className="flex items-start gap-3 text-caption-2 text-gray-500 font-medium">
                            <FiMapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{event.venue}</span>
                        </p>
                    </div>

                    <div className="border-t border-dashed border-gray-200 my-2"></div>

                    <div className="flex justify-center items-center py-6 min-h-50">
                        {loading ? (
                            <Spinner size="md" variant="primary" />
                        ) : passData?.qr_data ? (
                            <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                                <QRCode 
                                    value={passData.qr_data} 
                                    size={160}
                                    level="H"
                                />
                            </div>
                        ) : (
                            <p className="text-gray-400 text-sm">QR Code unavailable</p>
                        )}
                    </div>

                    <div className="border-t border-dashed border-gray-200 my-2 mb-6"></div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between bg-[#F9FAFB] border border-gray-100 rounded-xl p-4">
                            <span className="font-mono font-bold text-gray-900 tracking-wider">
                                {code}
                            </span>
                            <button 
                                onClick={handleCopyCode}
                                className="text-gray-400 hover:text-gray-700 transition-colors"
                            >
                                <FiCopy size={18} />
                            </button>
                        </div>

                        <div className="flex items-center">
                            <span className="bg-[#E6F4EA] text-[#137333] text-[12px] font-bold px-3 py-1.5 rounded-md">
                                Confirmed
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}