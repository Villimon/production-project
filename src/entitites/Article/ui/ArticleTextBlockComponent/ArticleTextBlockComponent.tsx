import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import cls from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleTextBlockComponentProps {
    className?: string
    block: ArticleTextBlock
}
export const ArticleTextBlockComponent: FC<ArticleTextBlockComponentProps> = memo(({ className, block }) => (
    <section
        className={classNames(cls.ArticleTextBlockComponent, {}, [
            className,
        ])}
    >
        {block.title && (
            <ToggleFeatures
                name="isAppRedesigned"
                on={<Text title={block.title} className={cls.title} />}
                off={(
                    <TextDeprecated
                        title={block.title}
                        className={cls.title}
                    />
                )}
            />
        )}
        {block.paragraphs.map((parag) => (
            <ToggleFeatures
                name="isAppRedesigned"
                on={(
                    <Text
                        key={parag}
                        text={parag}
                        className={cls.paragraphs}
                    />
                )}
                off={(
                    <TextDeprecated
                        key={parag}
                        text={parag}
                        className={cls.paragraphs}
                    />
                )}
            />
        ))}
    </section>
));
