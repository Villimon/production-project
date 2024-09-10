import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'accent'
export type TextAlign = 'left' | 'right' | 'center'
export type TextSize = 's' | 'm' | 'l'

type HeaderTagType = 'h1' | 'h2' | 'h3'

const mapSizeToClass: Record<TextSize, string> = {
    s: 'size_s',
    m: 'size_m',
    l: 'size_l',
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
};

interface TextProps {
    className?: string
    text?: string
    title?: string
    variant?: TextVariant
    aligh?: TextAlign
    size?: TextSize
    'data-testid'?: string
}

export const Text: FC<TextProps> = memo(
    ({
        className,
        title,
        text,
        variant = 'primary',
        aligh = 'left',
        size = 'm',
        'data-testid': dataTestId = 'Text',
    }) => {
        const HeaderTag = mapSizeToHeaderTag[size];
        const sizeClass = mapSizeToClass[size];

        return (
            <div
                className={classNames(cls.Text, {}, [
                    className,
                    cls[variant],
                    cls[aligh],
                    sizeClass,
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
