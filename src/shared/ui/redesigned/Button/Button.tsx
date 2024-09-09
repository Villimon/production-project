import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline'
export type ButtonSize = 'm' | 'l' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    variant?: ButtonVariant
    square?: boolean
    size?: ButtonSize
    disabled?: boolean
    children: ReactNode
    fullWidth?: boolean
}

export const Button = memo(
    ({
        className,
        children,
        variant = 'outline',
        square,
        disabled,
        size = 'm',
        fullWidth,
        ...otherProps
    }: ButtonProps) => (
        <button
            type="button"
            {...otherProps}
            disabled={disabled}
            className={classNames(
                cls.Button,
                {
                    [cls.square]: square,
                    [cls.disabled]: disabled,
                    [cls.fullWidth]: fullWidth,
                },
                [className, cls[variant], cls[size]],
            )}
        >
            {children}
        </button>
    ),
);
