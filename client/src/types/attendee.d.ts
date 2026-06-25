export interface Attendee {
    user_id: number | string;
    full_name: string;
    status: string; // 'registered' | 'attended'
    code: string;
    checked_in_at: string | null;
}

export interface AttendanceData {
    event_id: string;
    attendees: Attendee[];
    total_registered: number;
    total_checked_in: number;
    total_capacity: number;
    total_available: number;
}