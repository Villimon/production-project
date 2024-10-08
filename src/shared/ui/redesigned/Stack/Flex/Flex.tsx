import { ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between'
export type FlexAlign = 'start' | 'center' | 'end'
export type FlexDirection = 'row' | 'column'
export type FlexGap = '4' | '8' | '16' | '24' | '32'
export type FlexWrap = 'nowrap' | 'wrap'

type DivProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>

export interface FlexProps extends DivProps {
    className?: string
    justify?: FlexJustify
    align?: FlexAlign
    direction: FlexDirection
    gap?: FlexGap
    wrap?: FlexWrap
    max?: boolean
    children: ReactNode
}

const justifyClasses: Record<FlexJustify, string> = {
    between: cls.justifyBetween,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    start: cls.justifyStart,
};

const alignClasses: Record<FlexAlign, string> = {
    center: cls.alignCenter,
    end: cls.alignEnd,
    start: cls.alignStart,
};

const directionClasses: Record<FlexDirection, string> = {
    column: cls.directionColumn,
    row: cls.directionRow,
};

const gapClasses: Record<FlexGap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    24: cls.gap24,
    32: cls.gap32,
};

export const Flex = ({
    className,
    children,
    direction = 'row',
    align = 'center',
    justify = 'start',
    wrap = 'nowrap',
    gap,
    max,
    ...otherProps
}: FlexProps) => {
    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        cls[wrap],
        gap && gapClasses[gap],
    ];

    return (
        <div
            className={classNames(cls.Flex, { [cls.max]: max }, classes)}
            {...otherProps}
        >
            {children}
        </div>
    );
};
