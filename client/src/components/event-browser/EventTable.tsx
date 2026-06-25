import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IoMdAlert } from "react-icons/io";
import type { EventWithCategory } from "@/types/event";
import Button from "@/components/Button";
import { Spinner } from "@/components/ui/spinner";

interface MyEventsTableProps {
    events: EventWithCategory[];
    loading: boolean;
    error: any;
    errorMessage: string | null;
    searchQuery: string;
    onRetry: () => void;
    onEdit: (id: string | number) => void;
    onDelete: (event: EventWithCategory) => void;
    currentPage: number;
    totalPages: number;
    totalEvents: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
}

function EventTable({
    events, loading, error, errorMessage, searchQuery, onRetry, onEdit, onDelete,
    currentPage, totalPages, totalEvents, rowsPerPage, onPageChange
}: MyEventsTableProps) {
    const currentEvents = events;

    // totalPages and currentEvents handled by server
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-200">
            <thead className="bg-[#2D2D2D] text-white text-label uppercase tracking-wider">
                <tr>
                    <th className="p-4 rounded-tl-xl">Event</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Capacity</th>
                    <th className="p-4 text-center rounded-tr-xl">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-caption-2">
                {loading && (
                    <tr>
                        <td colSpan={5} className="p-16 text-center">
                            <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
                                <Spinner size="md" variant="primary" />
                                <p className="font-medium text-caption-1">Fetching your events...</p>
                            </div>
                        </td>
                    </tr>
                )}

                {error && !loading && (
                    <tr>
                        <td colSpan={5} className="p-12">
                            <div className="flex-1 flex flex-col items-center justify-center py-10">
                                <IoMdAlert className="text-warning-text w-12 h-12 mb-4 mx-auto" />
                                <h3 className="text-lg font-bold text-ink mb-1">Failed to load data</h3>
                                <p className="text-text-secondary">{errorMessage || 'An error occurred.'}</p>
                                <Button
                                    bgColorClass="bg-brand-red"
                                    className={'px-5 py-2.5 rounded-md font-medium shadow-sm text-button-lg mt-5'}
                                    onClick={onRetry}
                                >
                                    Try Again
                                </Button>
                            </div>
                        </td>
                    </tr>
                )}

                {events.length === 0 && !loading && !error && (
                    <tr>
                        <td colSpan={5} className="p-12 text-center text-gray-500">
                            {searchQuery ? 'No events match your search.' : 'No events found. Click "+ New Event" to get started!'}
                        </td>
                    </tr>
                )}
                
                {!loading && !error && currentEvents.map((event) => {
                    const date = new Date(event.date);
                    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    
                    const attendeesCount = (event as any).attendees_count || event.event_attendances_count || 0;
                    const fillPercentage = Math.min((attendeesCount / event.capacity) * 100, 100);

                    return (
                        <tr key={event.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-4">
                                <p className="font-bold text-gray-900">{event.title}</p>
                                <p className="text-gray-500 text-caption-3 mt-0.5">{event.venue}</p>
                            </td>
                            <td className="p-4 text-gray-600">
                                {formattedDate}
                            </td>
                            <td className="p-4">
                                <span className="border border-gray-200 text-gray-600 px-3 py-1 rounded-md text-caption-3">
                                    {event.category.name}
                                </span>
                            </td>
                            <td className="p-4">
                                <p className="text-caption-3 text-gray-900 mb-1.5">{attendeesCount}/{event.capacity}</p>
                                <div className="w-full bg-gray-100 rounded-full h-1">
                                    <div className="bg-[#CB2229] h-1 rounded-full transition-all duration-500" style={{ width: `${fillPercentage}%` }}></div>
                                </div>
                            </td>
                            <td className="p-4">
                                <div className="flex items-center justify-center gap-4">
                                    <Button 
                                        bgColorClass="bg-transparent"
                                        textColorClass="text-gray"
                                        onClick={() => onEdit(event.id)}>
                                        <FiEdit2 size={16} />
                                    </Button>

                                    <Button 
                                        bgColorClass="bg-transparent"
                                        textColorClass="text-brand-red"
                                        onClick={() => onDelete(event)}>
                                        <FiTrash2 size={16} />
                                    </Button>   
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

        {!loading && !error && totalEvents > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white rounded-b-xl">
                <p className="text-sm text-gray-500 font-medium">
                    Showing <span className="font-bold text-gray-900">{((currentPage - 1) * rowsPerPage) + 1}</span> to <span className="font-bold text-gray-900">{Math.min(currentPage * rowsPerPage, totalEvents)}</span> of <span className="font-bold text-gray-900">{totalEvents}</span> results
                </p>
                <div className="flex items-center gap-3">
                    <Button 
                        bgColorClass="bg-transparent"
                        textColorClass="text-black"
                        onClick={() => onPageChange(currentPage - 1)}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-button-md disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentPage <= 1}
                    >
                        
                        Previous
                    </Button>
                    <span className="text-label text-gray-600 font-caption-2 px-2">
                        Page {currentPage} of {Math.max(1, totalPages)}
                    </span>
                    <Button 
                        bgColorClass="bg-transparent"
                        textColorClass="text-black"
                        onClick={() => onPageChange(currentPage + 1)}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-button-md disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentPage >= totalPages}
                    >
                        
                        Next
                    </Button>
                </div>
            </div>
        )}
    </div>
  )
}

export default EventTable