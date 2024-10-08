import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
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
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

type HeaderTagType = 'h1' | 'h2' | 'h3'

const mapSizeToHeaderSize: Record<TextSize, HeaderTagType> = {
    [TextSize.S]: 'h3',
    [TextSize.M]: 'h2',
    [TextSize.L]: 'h1',
};

interface TextProps {
    className?: string
    text?: string
    title?: string
    theme?: TextTheme
    aligh?: TextAlign
    size?: TextSize
    'data-testid'?: string
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Text: FC<TextProps> = memo(
    ({
        className,
        title,
        text,
        theme = TextTheme.PRIMARY,
        aligh = TextAlign.LEFT,
        size = TextSize.M,
        'data-testid': dataTestId = 'Text',
    }) => {
        const HeaderTag = mapSizeToHeaderSize[size];

        return (
            <div
                className={classNames(cls.Text, {}, [
                    className,
                    cls[theme],
                    cls[aligh],
                    cls[size],
                ])}
            >
                {title && (
                    <HeaderTag
                        data-testid={`${dataTestId}.Header`}
                        className={cls.title}
                    >
                        {title}
                    </HeaderTag>
                )}
                {text && (
                    <p
                        data-testid={`${dataTestId}.Paragraph`}
                        className={cls.text}
                    >
                        {text}
                    </p>
                )}
            </div>
        );
    },
);
