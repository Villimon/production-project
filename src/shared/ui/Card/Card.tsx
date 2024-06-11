import { FC, HTMLAttributes, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}
export const Card: FC<CardProps> = memo(
    ({ className, children, ...otherProps }) => (
        <div
            {...otherProps}
            className={classNames(cls.Card, {}, [className])}
        >
            {children}
        </div>
    ),
);
