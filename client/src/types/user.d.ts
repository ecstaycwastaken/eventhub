export interface User {
    id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    profile_image: string | null;
    [string]?: string | null;
}