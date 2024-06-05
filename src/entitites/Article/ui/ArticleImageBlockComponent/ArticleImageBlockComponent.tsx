import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
    className?: string;
}
export const ArticleImageBlockComponent: FC<ArticleImageBlockComponentProps> = ({ className }) => (
    <div
        className={classNames(cls.ArticleImageBlockComponent, {}, [
            className,
        ])}
    >
        ArticleImageBlockComponent
    </div>
);
