import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserData, getUserRole, UserRole } from '@/entitites/User';
import { RoutePath } from '@/shared/constants/router';

interface RequierAuthProps {
    children: JSX.Element
    roles?: UserRole[]
}

export const RequierAuth = ({ children, roles }: RequierAuthProps) => {
    const auth = useSelector(getUserData);
    const userRoles = useSelector(getUserRole);
    const location = useLocation();

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }

        // Вернет true если хоть на один элемент колбэк вернет true
        return roles.some((requiredRole) => userRoles?.includes(requiredRole));
    }, [roles, userRoles]);

    if (!auth || !hasRequiredRoles) {
        return (
            <Navigate to={RoutePath.main} state={{ from: location }} replace />
        );
    }

    return children;
};
