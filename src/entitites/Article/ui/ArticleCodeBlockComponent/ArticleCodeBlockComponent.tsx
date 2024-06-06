import { ArticleCodeBlock } from 'entitites/Article/model/types/article';
import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Code } from 'shared/ui/Code/Code';

interface ArticleCodeBlockComponentProps {
    className?: string;
    block: ArticleCodeBlock;
}
export const ArticleCodeBlockComponent: FC<ArticleCodeBlockComponentProps> =
    memo(({ className, block }) => (
        <div className={classNames('', {}, [className])}>
            <Code text={block.code} />
        </div>
    ));
