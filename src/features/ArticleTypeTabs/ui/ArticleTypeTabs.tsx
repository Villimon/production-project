import {
    FC, memo, useCallback, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleType } from '@/entitites/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { ToggleFeatures } from '@/shared/lib/features';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

interface ArticleTypeTabsProps {
    className?: string
    value: ArticleType
    onChangeType: (type: ArticleType) => void
}
export const ArticleTypeTabs: FC<ArticleTypeTabsProps> = memo(
    ({ className, value, onChangeType }) => {
        const { t } = useTranslation('article');

        const typeTabs = useMemo<TabItem[]>(
            () => [
                {
                    value: ArticleType.ALL,
                    content: t('Все статьи'),
                },
                {
                    value: ArticleType.IT,
                    content: t('Айти'),
                },
                {
                    value: ArticleType.ECONOMICS,
                    content: t('Экономика'),
                },
                {
                    value: ArticleType.SCIENCE,
                    content: t('Наука'),
                },
            ],
            [t],
        );

        const onTabClick = useCallback(
            (tab: TabItem) => {
                onChangeType(tab.value as ArticleType);
            },
            [onChangeType],
        );

        return (
            <ToggleFeatures
                name="isAppRedesigned"
                on={(
                    <Tabs
                        direction="column"
                        tabs={typeTabs}
                        value={value}
                        onTabClick={onTabClick}
                        className={classNames('', {}, [className])}
                    />
                )}
                off={(
                    <TabsDeprecated
                        tabs={typeTabs}
                        value={value}
                        onTabClick={onTabClick}
                        className={classNames('', {}, [className])}
                    />
                )}
            />
        );
    },
);
