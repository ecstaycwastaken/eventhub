import type { Category } from './category';

export interface Event {
    id: string;
    user_id: string;
    category_id: string;
    title: string;
    description: string;
    date: string;
    venue: string;
    capacity: number;
    price: number;
    banner_image: string;
    event_attendances_count?: number | null;
    created_at: string;
    updated_at: string;
}

export interface EventWithCategory extends Event {
    category: Category;
}

export interface EventCreationFormData {
    title: string;
    description: string;
    categoryId: string | null;
    eventDate: string;
    eventTime: string;
    venue: string;
    capacity: string;
    price: string;
    ticketType: "Free" | "Paid";
}

export interface Attendance {
    user_id: string;
    full_name: string;
    status: "host" | "attended" | "registered";
    code: string;
    checked_in_at?: string;
}

export interface EventsWithAttendance {
    event_id: string;
    title: string;
    date: string;
    venue: string;
    capacity: number;
    attendees: Attendance[];
}