import { User } from '@/entitites/User';

export interface Comment {
    id: string;
    user: User;
    text: string;
}
