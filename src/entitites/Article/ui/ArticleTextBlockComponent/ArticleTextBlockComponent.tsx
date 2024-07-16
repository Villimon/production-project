import { FC, memo } from 'react';
import { ArticleTextBlock } from '@/entitites/Article/model/types/article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text/Text';
import cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}
export const ArticleTextBlockComponent: FC<ArticleTextBlockComponentProps> = memo(({ className, block }) => (
    <section
        className={classNames(cls.ArticleTextBlockComponent, {}, [
            className,
        ])}
    >
        {block.title && <Text title={block.title} className={cls.title} />}
        {block.paragraphs.map((parag) => (
            <Text key={parag} text={parag} className={cls.paragraphs} />
        ))}
    </section>
));
