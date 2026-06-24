import type { User } from "@/types/user";

export interface AuthResponse {
    message?: string;
    user: User;
}