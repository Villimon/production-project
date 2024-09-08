import { FC, memo } from 'react';
import { ArticleView } from '@/entitites/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import TiledIcon from '@/shared/assets/icons/tiled-24-24.svg';
import { Button, ThemeButton } from '@/shared/ui/deprecated/Button';
import cls from './ArticleViewSelector.module.scss';
import { Icon } from '@/shared/ui/deprecated/Icon';

interface ArticleViewSelectorProps {
    className?: string
    view: ArticleView
    onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        Icon: TiledIcon,
    },
    {
        view: ArticleView.BIG,
        Icon: ListIcon,
    },
];

export const ArticleViewSelector: FC<ArticleViewSelectorProps> = memo(
    ({ className, view, onViewClick }) => {
        const onClick = (newView: ArticleView) => () => {
            onViewClick?.(newView);
        };

        return (
            <div className={classNames('', {}, [className])}>
                {viewTypes.map((item) => (
                    <Button
                        key={item.view}
                        onClick={onClick(item.view)}
                        theme={ThemeButton.CLEAR}
                    >
                        <Icon
                            width={24}
                            height={24}
                            className={classNames('', {
                                [cls.selected]: item.view === view,
                            })}
                            Svg={item.Icon}
                        />
                    </Button>
                ))}
            </div>
        );
    },
);
