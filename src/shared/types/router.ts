import { RouteProps } from 'react-router-dom';
import { UserRole } from '@/entitites/User';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean
    roles?: UserRole[]
}
