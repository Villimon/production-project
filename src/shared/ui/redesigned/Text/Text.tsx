import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'accent'
export type TextAlign = 'left' | 'right' | 'center'
export type TextSize = 's' | 'm' | 'l'

type HeaderTagType = 'h1' | 'h2' | 'h3'

const mapSizeToClass: Record<TextSize, string> = {
    s: cls.size_s,
    m: cls.size_m,
    l: cls.size_l,
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
    align?: TextAlign
    size?: TextSize
    bold?: boolean
    'data-testid'?: string
}

export const Text: FC<TextProps> = memo(
    ({
        className,
        title,
        text,
        variant = 'primary',
        align = 'left',
        size = 'm',
        bold,
        'data-testid': dataTestId = 'Text',
    }) => {
        const HeaderTag = mapSizeToHeaderTag[size];
        const sizeClass = mapSizeToClass[size];

        return (
            <div
                className={classNames(cls.Text, { [cls.bold]: bold }, [
                    className,
                    cls[variant],
                    cls[align],
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
