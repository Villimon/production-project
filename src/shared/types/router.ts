import { RouteProps } from 'react-router-dom';
// eslint-disable-next-line project-my-plugin/layer-imports
import { UserRole } from '@/entitites/User';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean
    roles?: UserRole[]
}
