import { FC, memo } from 'react';
import { ArticleImgBlock } from '@/entitites/Article/model/types/article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign } from '@/shared/ui/Text';
import cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImgBlock;
}
export const ArticleImageBlockComponent: FC<ArticleImageBlockComponentProps> = memo(({ className, block }) => (
    <section
        className={classNames(cls.ArticleImageBlockComponent, {}, [
            className,
        ])}
    >
        <img src={block.src} className={cls.img} alt={block.title} />
        {block.title && (
            <Text text={block.title} aligh={TextAlign.CENTER} />
        )}
    </section>
));
