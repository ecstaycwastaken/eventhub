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
    created_at: string;
    updated_at: string;
}

export interface EventWithCategory extends Event {
    category: Category;
}