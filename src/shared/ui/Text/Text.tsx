import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

export enum TextAlign {
    LEFT = 'left',
    RIGTH = 'right',
    CENTER = 'center',
}

interface TextProps {
    className?: string;
    text?: string;
    title?: string;
    theme?: TextTheme;
    aligh?: TextAlign;
}
export const Text: FC<TextProps> = memo(
    ({
        className,
        title,
        text,
        theme = TextTheme.PRIMARY,
        aligh = TextAlign.LEFT,
    }) => (
        <div
            className={classNames(cls.Text, {}, [
                className,
                cls[theme],
                cls[aligh],
            ])}
        >
            {title && <p className={cls.title}>{title}</p>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    ),
);
