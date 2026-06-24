import type { User } from "@/types/user";
import type { EventWithCategory } from "@/types/event";

export interface AuthResponse {
    message?: string;
    user: User;
}

export interface GetAllEventsResponse {
    has_events: boolean;
    events: EventWithCategory[];
    total_events: number;
    categories: {
        [string]: number;
    }
}

export interface GetAllUsersResponse {
    message?: string;
    users: User[];
}

export interface GetUserByIdResponse {
    message?: string;
    user: User;
}