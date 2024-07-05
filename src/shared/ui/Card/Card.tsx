import {
    FC, HTMLAttributes, memo, ReactNode,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINE = 'outline',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    theme?: CardTheme;
    children: ReactNode;
}
export const Card = ({
    className,
    children,
    theme = CardTheme.NORMAL,
    ...otherProps
}: CardProps) => (
    <div
        {...otherProps}
        className={classNames(cls.Card, {}, [className, cls[theme]])}
    >
        {children}
    </div>
);
