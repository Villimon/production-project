import { FC, memo } from 'react';
import { ArticleCodeBlock } from '@/entitites/Article/model/types/article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Code } from '@/shared/ui/Code';

interface ArticleCodeBlockComponentProps {
    className?: string;
    block: ArticleCodeBlock;
}
export const ArticleCodeBlockComponent: FC<ArticleCodeBlockComponentProps> = memo(({ className, block }) => (
    <section className={classNames('', {}, [className])}>
        <Code text={block.code} />
    </section>
));
