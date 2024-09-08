import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import './Loader.scss';

interface LoaderProps {
    className?: string
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Loader: FC<LoaderProps> = ({ className }) => (
    <div className={classNames('lds-ring', {}, [className])}>
        <div />
        <div />
        <div />
        <div />
    </div>
);
