import { FC, memo } from 'react';
import { ArticleView } from '@/entitites/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import ListIcon from '@/shared/assets/icons/burger.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import cls from './ArticleViewSelector.module.scss';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleViewSelectorProps {
    className?: string
    view: ArticleView
    onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        Icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => TiledIcon,
            off: () => TiledIconDeprecated,
        }),
    },
    {
        view: ArticleView.BIG,
        Icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ListIcon,
            off: () => ListIconDeprecated,
        }),
    },
];

export const ArticleViewSelector: FC<ArticleViewSelectorProps> = memo(
    ({ className, view, onViewClick }) => {
        const onClick = (newView: ArticleView) => () => {
            onViewClick?.(newView);
        };

        return (
            <ToggleFeatures
                name="isAppRedesigned"
                on={(
                    <Card
                        border="round"
                        className={classNames(
                            cls.ArticleViewSelectorRedesigned,
                            {},
                            [className],
                        )}
                    >
                        <HStack gap="8">
                            {viewTypes.map((item) => (
                                <Icon
                                    clickable
                                    key={item.view}
                                    onClick={onClick(item.view)}
                                    height={24}
                                    className={classNames('', {
                                        [cls.selected]: item.view !== view,
                                    })}
                                    Svg={item.Icon}
                                />
                            ))}
                        </HStack>
                    </Card>
                )}
                off={(
                    <div
                        className={classNames(cls.ArticleViewSelector, {}, [
                            className,
                        ])}
                    >
                        {viewTypes.map((item) => (
                            <ButtonDeprecated
                                key={item.view}
                                onClick={onClick(item.view)}
                                theme={ThemeButton.CLEAR}
                            >
                                <IconDeprecated
                                    width={24}
                                    height={24}
                                    className={classNames('', {
                                        [cls.selected]: item.view === view,
                                    })}
                                    Svg={item.Icon}
                                />
                            </ButtonDeprecated>
                        ))}
                    </div>
                )}
            />
        );
    },
);
