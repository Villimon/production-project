import { FC, ReactElement, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SticyContentLayout.module.scss';

interface SticyContentLayoutProps {
    className?: string
    content: ReactElement
    right?: ReactElement
    left?: ReactElement
}
export const SticyContentLayout: FC<SticyContentLayoutProps> = memo(
    ({
        className, content, left, right,
    }) => (
        <div
            className={classNames(cls.SticyContentLayout, {}, [className])}
        >
            {left && <div className={cls.left}>{left}</div>}
            <div className={cls.content}>{content}</div>
            {right && <div className={cls.right}>{right}</div>}
        </div>
    ),
);
