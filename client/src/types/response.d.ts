import type { User } from "@/types/user";
import type { EventWithCategory } from "@/types/event";

export interface AuthResponse {
    message?: string;
    user: User;
}

export interface GetAllEventsResponse {
    hasEvents: boolean; // TODO: Make a snake_case in the backend for this property
    events: EventWithCategory[];
    total_events: number;
    categories: {
        [string]: number;
    }
}