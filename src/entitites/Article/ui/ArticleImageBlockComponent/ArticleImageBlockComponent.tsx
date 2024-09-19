import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text';
import cls from './ArticleImageBlockComponent.module.scss';
import { ArticleImgBlock } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleImageBlockComponentProps {
    className?: string
    block: ArticleImgBlock
}
export const ArticleImageBlockComponent: FC<ArticleImageBlockComponentProps> = memo(({ className, block }) => (
    <section
        className={classNames(cls.ArticleImageBlockComponent, {}, [
            className,
        ])}
    >
        <img src={block.src} className={cls.img} alt={block.title} />
        {block.title && (
            <ToggleFeatures
                name="isAppRedesigned"
                on={<Text text={block.title} align="center" />}
                off={(
                    <TextDeprecated
                        text={block.title}
                        aligh={TextAlign.CENTER}
                    />
                )}
            />
        )}
    </section>
));
