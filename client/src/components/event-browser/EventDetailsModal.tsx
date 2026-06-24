import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import heroBG from '@/assets/hero-bg.png';
import { FiEdit2 } from 'react-icons/fi'; 
import type { EventWithCategory } from "@/types/event";
import Button from '../Button';

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventWithCategory;
}

function EventDetailsModal({ isOpen, onClose, event }: EventDetailsModalProps) {
    const location = useLocation();
    const navigate = useNavigate();

    const price = Number(event.price) === 0 ? 'Free' : `₱${Number(event.price).toLocaleString()}`;
    const date = new Date(event.date);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    const isFromAdminRoute = location.pathname.startsWith('/admin');

    const handleEditClick = useCallback(() => {
        const route = isFromAdminRoute ? '/admin/events/edit' : '/u/my-events/edit';
        navigate(`${route}/${event.id}`);
    }, [isFromAdminRoute, event.id, navigate]);

    if (!isOpen) return null;

    return (
        <div className="fixed font-dm inset-0 z-50 flex items-center justify-center bg-black/60 p-4 md:p-6 overflow-hidden">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[95vh] overflow-hidden animate-in fade-in duration-200">
                <div className="relative h-64 w-full shrink-0">
                    <img
                    src={event.banner_image || heroBG}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

                    <Button
                        bgColorClass="bg-white/10"
                        className="absolute top-4 right-4 z-20 flex items-center justify-center w-10 h-10 rounded-full"
                        onClick={onClose}
                    >
                        &times;
                    </Button>

                    <div className="absolute bottom-5 left-5 right-5">
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="flex items-center bg-[#3B82F6] text-white text-sub-2 font-bold px-3 py-1 rounded-full">
                            {event.category.name}
                        </span>
                        <span className="flex items-center bg-black/70 text-white text-sub-2 font-bold px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                            {price}
                        </span>
                        <span className="flex items-center bg-[#D1FADF] text-[#039855] text-sub-2 font-bold px-3 py-1 rounded-full">
                            Confirmed
                        </span>
                    </div>
                    <h2 className="text-heading-1 text-white leading-tight">
                        {event.title}
                    </h2>
                    </div>
                </div>

                <div className="p-6 flex-1 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="flex flex-col bg-[#F9FAFB] p-4 rounded-2xl border border-[#F3F4F6]">
                            <p className="text-sub-1 font-bold text-gray-500 tracking-wider mb-1">DATE & TIME</p>
                            <p className="font-bold text-gray-900 text-heading-3">{formattedDate}</p>
                            <p className="text-gray-500 text-sub-2 mt-auto">{formattedTime}</p>
                        </div>
                        <div className="bg-[#F9FAFB] p-4 rounded-2xl border border-[#F3F4F6]">
                            <p className="text-sub-1 font-bold text-gray-500 tracking-wider mb-1">VENUE</p>
                            <p className="font-bold text-gray-900 text-heading-3">{event.venue}</p>
                        </div>
                        <div className="bg-[#F9FAFB] p-4 rounded-2xl border border-[#F3F4F6] col-span-full">
                            <p className="text-sub-1 font-bold text-gray-500 tracking-wider mb-1">AVAILABLE SLOTS</p>
                            <p className="font-bold text-[#039855] text-heading-3">300 of {event.capacity}</p>
                        </div>
                    </div>

                    <div className="mb-7">
                    <div className="flex justify-between text-[12px] text-gray-500 mb-2">
                        <span>300 / {event.capacity} slots filled</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div 
                        className="bg-[#039855] h-1.5 rounded-full transition-all duration-500" 
                        style={{ width: `${30}%` }}
                        ></div>
                    </div>
                    </div>

                    <div>
                    <p className="text-sub-1 font-bold text-gray-500 uppercase tracking-wider mb-2">About this event</p>
                    <p className="text-black text-caption-1 leading-relaxed whitespace-pre-wrap">
                        {event.description}
                    </p>
                    </div>
                </div>

                <div className="p-5 border-t border-gray-100 flex gap-3 bg-white shrink-0">
                    <Button
                        bgColorClass="bg-transparent"
                        textColorClass="text-black"
                        className="flex flex-1 justify-center items-center gap-2 text-button-lg w-full rounded-2xl py-3 border border-black"
                        onClick={handleEditClick}
                    >
                        <FiEdit2 size={18} /> Edit Event
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EventDetailsModal