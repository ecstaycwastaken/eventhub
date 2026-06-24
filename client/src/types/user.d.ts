export interface User {
    id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    profile_image: string | null;
    role: 'user' | 'admin';
    contact_number: string | null;
    country: string | null;
    region: string | null;
    city: string | null;
    [string]?: string | null;
}