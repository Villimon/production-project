import { HTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outline'
export type CardPadding = '0' | '8' | '16' | '24'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
    variant?: CardVariant
    children: ReactNode
    fullWidth?: boolean
    padding?: CardPadding
}

const mapPaddingToClass: Record<CardPadding, string> = {
    0: 'gap_0',
    8: 'gap_8',
    16: 'gap_16',
    24: 'gap_24',
};

export const Card = ({
    className,
    children,
    variant = 'normal',
    fullWidth,
    padding = '8',
    ...otherProps
}: CardProps) => (
    <div
        {...otherProps}
        className={classNames(cls.Card, { [cls.fullWidth]: fullWidth }, [
            className,
            cls[variant],
            cls[mapPaddingToClass[padding]],
        ])}
    >
        {children}
    </div>
);
