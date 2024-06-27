import {
    FC, ForwardedRef, forwardRef, memo,
} from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
}

// forwardRef нужен чтобы работал клин через клавиатуру
export const AppLink: FC<AppLinkProps> = forwardRef(
    (
        {
            children,
            to,
            className,
            theme = AppLinkTheme.PRIMARY,
            ...otherProps
        },
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
