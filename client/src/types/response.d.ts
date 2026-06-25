import type { User } from "@/types/user";
import type { EventWithCategory, EventsWithAttendance } from "@/types/event";

export interface AuthResponse {
    message?: string;
    user: User;
}

export interface GetAllEventsResponse {
    has_events: boolean;
    events: EventWithCategory[];
    pagination?: {
        has_more: boolean;
        next_cursor: string | null;
    };
    total_events: number;
}

export interface GetAllUsersResponse {
    message?: string;
    users: User[];
}

export interface GetUserByIdResponse {
    message?: string;
    user: User;
}

export interface GetAllEventsAttendanceResponse {
    message?: string;
    has_events: boolean;
    events_attendance_data: EventsWithAttendance[];
    total_events: number;
}