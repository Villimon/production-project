import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ThemeButton {
    CLEAR = 'clear',
    OUTLINE = 'outline',
    RED = 'red',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    theme?: ThemeButton
    square?: boolean
    size?: ButtonSize
    disabled?: boolean
    children: ReactNode
    fullWidth?: boolean
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Button = memo(
    ({
        className,
        children,
        theme = ThemeButton.OUTLINE,
        square,
        disabled,
        size = ButtonSize.M,
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
                [className, cls[theme], cls[size]],
            )}
        >
            {children}
        </button>
    ),
);
