import { FC, HTMLAttributes, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINE = 'outline',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    theme?: CardTheme;
}
export const Card: FC<CardProps> = memo(
    ({
        className, children, theme = CardTheme.NORMAL, ...otherProps
    }) => (
        <div
            {...otherProps}
            className={classNames(cls.Card, {}, [className, cls[theme]])}
        >
            {children}
        </div>
    ),
);
