import { useState, useEffect } from "react";
import { FiSearch, FiCheck } from "react-icons/fi";
import { IoQrCode } from "react-icons/io5";
import { toast } from "sonner";
import type { AttendanceData } from "@/types/attendee";
import { useHttp } from "@/hooks";
import { Spinner } from "@/components/ui/spinner";
import Button from "@/components/Button";

interface EventOption {
    id: number | string;
    title: string;
}

function CheckInPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [manualCode, setManualCode] = useState("");
    const [selectedEventId, setSelectedEventId] = useState<string>("");

    const { data: eventsRes, sendRequest: fetchEvents, loading: loadingEvents } = useHttp<{events: EventOption[]}>();
    const { data: attendanceData, sendRequest: fetchAttendance, loading: loadingAttendance } = useHttp<AttendanceData>();
    const { sendRequest: checkInRequest, loading: isCheckingIn } = useHttp();

    useEffect(() => {
        fetchEvents({ 
            method: 'GET', 
            url: '/api/v1/event/my-events?columns=id,title' 
        });
    }, [fetchEvents]);

    const effectiveEventId = selectedEventId || (eventsRes?.events?.length ? eventsRes.events[0].id.toString() : "");

    useEffect(() => {
        if (effectiveEventId) {
            fetchAttendance({ 
                method: 'GET', 
                url: `/api/v1/event/attendance/${effectiveEventId}` 
            });
        }
    }, [effectiveEventId, fetchAttendance]);

    const handleCheckIn = async (codeToUse: string) => {
        if (!codeToUse || !effectiveEventId) return;

        try {
            const response = await checkInRequest({
                method: 'POST',
                url: `/api/v1/event/check-in?code=${codeToUse}&event_id=${effectiveEventId}`
            });

            if (response) {
                toast.success("Successfully checked in attendee!", {
                    classNames: {
                        toast: 'bg-[#F1FFEB] text-[#44A872] font-dm font-medium rounded-xl border border-[#44A872]'
                    }
                });
                setManualCode("");

                fetchAttendance({ 
                    method: 'GET', 
                    url: `/api/v1/event/attendance/${effectiveEventId}` 
                });
            } else {
                toast.error("Failed to check in. Please verify the code.");
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error("Failed to check in. Please verify the code.");
        }
    };

    const filteredAttendees = (attendanceData?.attendees || []).filter(attendee =>
        attendee.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attendee.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatTime = (dateString: string | null) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };

    return (
        <div className="p-8 md:p-12 font-dm min-h-screen">
            
            <div className="mb-8">
                <h1 className="text-heading-1 font-bold text-gray-900 leading-tight mb-2">Attendance Check-In</h1>
                <p className="text-gray-500 text-caption-1">Scan QR codes or enter registration codes to check in attendees</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="border border-gray-200 rounded-xl p-5 shadow-sm">
                        <label className="flex items-center justify-between text-label text-gray-500 tracking-wider mb-3">
                            <span>SELECT EVENT</span>
                            {loadingEvents && <Spinner size="xs" variant="muted" thickness={3} />}
                        </label>
                        <select 
                            value={effectiveEventId}
                            onChange={(e) => setSelectedEventId(e.target.value)}
                            disabled={loadingEvents || !eventsRes?.events?.length}
                            className="w-full bg-[#F9FAFB] border border-gray-200 text-gray-800 text-caption-2 rounded-lg px-4 py-3 outline-none focus:border-gray-400 transition-colors appearance-none disabled:opacity-50"
                        >
                            {loadingEvents ? (
                                <option>Loading events...</option>
                            ) : eventsRes?.events?.length ? (
                                eventsRes.events.map(event => (
                                    <option key={event.id} value={event.id}>{event.title}</option>
                                ))
                            ) : (
                                <option>No events available</option>
                            )}
                        </select>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5 shadow-sm">
                        <label className="block text-label text-gray-500 tracking-wider mb-3">
                            ENTER CODE
                        </label>
                        <input 
                            type="text" 
                            placeholder="XXXXXXXXXXXXXXXX" 
                            value={manualCode}
                            onChange={(e) => setManualCode(e.target.value)}
                            className="w-full bg-[#F9FAFB] border border-gray-200 text-gray-800 text-caption-2 rounded-lg px-4 py-3 outline-none focus:border-gray-400 transition-colors mb-4 uppercase"
                        />
                        <Button 
                            bgColorClass="bg-[#2563EB]"
                            onClick={() => handleCheckIn(manualCode)}
                            disabled={isCheckingIn || !manualCode}
                            className="w-full disabled:opacity-70 disabled:hover:bg-[#2563EB] text-button-lg rounded-lg py-3 flex items-center justify-center gap-2"
                        >
                            <IoQrCode size={18} /> {isCheckingIn ? 'Checking in user...' : 'Check In'}
                        </Button>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-5 shadow-sm">
                        <h3 className="text-label text-gray-500 tracking-wider mb-4">EVENT STATS</h3>
                        <div className="flex flex-col gap-3 text-caption-2">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Confirmed</span>
                                <span className="font-bold text-gray-900">{attendanceData?.total_registered || 0}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Checked In</span>
                                <span className="font-bold text-[#039855]">{attendanceData?.total_checked_in || 0}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Available</span>
                                <span className="font-bold text-gray-900">{attendanceData?.total_available || 0}</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="lg:col-span-8 flex flex-col">
                    <div className="relative mb-6">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search attendees..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-gray-400 transition-colors text-caption-2 shadow-sm"
                        />
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
                        {loadingAttendance ? (
                            <div className="flex flex-col p-10 items-center justify-center flex-1 text-gray-500 gap-3">
                                <Spinner size="md" variant="primary" />
                                <p className="text-caption-1 font-medium">Loading attendees...</p>
                            </div>
                        ) : filteredAttendees.length === 0 ? (
                            <div className="flex items-center justify-center flex-1 text-gray-500 p-8 text-center text-caption-1">
                                {searchQuery ? 'No attendees match your search.' : 'No attendees found for this event.'}
                            </div>
                        ) : (
                            filteredAttendees.map((attendee, index) => (
                                <div 
                                    key={attendee.code}
                                    className={`flex items-center justify-between p-4 ${index !== filteredAttendees.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50/50 transition-colors`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center text-gray-800 font-bold text-caption-2 shrink-0">
                                            {attendee.full_name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="font-bold text-gray-900 text-caption-1">{attendee.full_name}</p>
                                            <p className="text-gray-400 text-caption-3 tracking-wide">{attendee.code}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        {attendee.status === "registered" ? (
                                            <span className="bg-[#E6F4EA] text-[#137333] px-3 py-1 rounded-md text-caption-3 font-bold">
                                                Confirmed
                                            </span>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <span className="bg-[#1A1A1A] text-white px-3 py-1.5 rounded-md text-caption-3 font-bold">
                                                    Checked In
                                                </span>
                                                <span className="text-gray-400 text-caption-3 font-medium">
                                                    {formatTime(attendee.checked_in_at)}
                                                </span>
                                            </div>
                                        )}

                                        {attendee.status === "registered" && (
                                            <Button 
                                                bgColorClass="bg-[#1A1A1A]"
                                                onClick={() => handleCheckIn(attendee.code)}
                                                disabled={isCheckingIn}
                                                className="flex items-center gap-2 disabled:opacity-70 disabled:hover:bg-[#1A1A1A] px-4 py-2 rounded-lg text-button-md shadow-sm"
                                            >
                                                <FiCheck /> Check In
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckInPage;