import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    INVERTED = 'inverted',
    ERROR = 'error',
}

export enum TextAlign {
    LEFT = 'left',
    RIGTH = 'right',
    CENTER = 'center',
}

export enum TextSize {
    M = 'size_m',
    L = 'size_l',
}

interface TextProps {
    className?: string;
    text?: string;
    title?: string;
    theme?: TextTheme;
    aligh?: TextAlign;
    size?: TextSize;
}
export const Text: FC<TextProps> = memo(
    ({
        className,
        title,
        text,
        theme = TextTheme.PRIMARY,
        aligh = TextAlign.LEFT,
        size = TextSize.M,
    }) => (
        <div
            className={classNames(cls.Text, {}, [
                className,
                cls[theme],
                cls[aligh],
                cls[size],
            ])}
        >
            {title && <p className={cls.title}>{title}</p>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    ),
);
