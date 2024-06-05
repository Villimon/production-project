import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
    className?: string;
}
export const ArticleTextBlockComponent: FC<ArticleTextBlockComponentProps> = ({
    className,
}) => (
    <div
        className={classNames(cls.ArticleTextBlockComponent, {}, [
            className,
        ])}
    >
        ArticleTextBlockComponent
    </div>
);
