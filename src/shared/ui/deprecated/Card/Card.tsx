import { HTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINE = 'outline',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
    theme?: CardTheme
    children: ReactNode
    fullWidth?: boolean
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Card = ({
    className,
    children,
    theme = CardTheme.NORMAL,
    fullWidth,
    ...otherProps
}: CardProps) => (
    <div
        {...otherProps}
        className={classNames(cls.Card, { [cls.fullWidth]: fullWidth }, [
            className,
            cls[theme],
        ])}
    >
        {children}
    </div>
);
