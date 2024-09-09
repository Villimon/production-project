import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'secondary'

interface AppLinkProps extends LinkProps {
    children: ReactNode
    className?: string
    variant?: AppLinkVariant
    activeClassName?: string
}

// forwardRef нужен чтобы работал клин через клавиатуру
export const AppLink = forwardRef(
    (
        {
            children,
            to,
            className,
            variant = 'primary',
            activeClassName = '',
            ...otherProps
        }: AppLinkProps,
        ref: ForwardedRef<HTMLAnchorElement>,
    ) => (
        <NavLink
            ref={ref}
            to={to}
            {...otherProps}
            className={({ isActive }) => classNames(cls.AppLink, { [activeClassName]: isActive }, [
                className,
                cls[variant],
            ])}
        >
            {children}
        </NavLink>
    ),
);
