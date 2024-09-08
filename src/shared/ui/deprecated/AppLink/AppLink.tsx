import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
    children: ReactNode
    className?: string
    theme?: AppLinkTheme
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
// forwardRef нужен чтобы работал клин через клавиатуру
export const AppLink = forwardRef(
    (
        {
            children,
            to,
            className,
            theme = AppLinkTheme.PRIMARY,
            ...otherProps
        }: AppLinkProps,
        ref: ForwardedRef<HTMLAnchorElement>,
    ) => (
        <Link
            ref={ref}
            to={to}
            {...otherProps}
            className={classNames(cls.AppLink, {}, [className, cls[theme]])}
        >
            {children}
        </Link>
    ),
);
