import { ButtonHTMLAttributes, FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
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
    className?: string;
    theme?: ThemeButton;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
}
export const Button: FC<ButtonProps> = memo(
    ({
        className,
        children,
        theme = ThemeButton.OUTLINE,
        square,
        disabled,
        size = ButtonSize.M,
        ...otherProps
    }) => (
        <button
            type="button"
            {...otherProps}
            disabled={disabled}
            className={classNames(
                cls.Button,
                { [cls.square]: square, [cls.disabled]: disabled },
                [className, cls[theme], cls[size]],
            )}
        >
            {children}
        </button>
    ),
);
