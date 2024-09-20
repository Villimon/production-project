import { FC, memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Raiting.module.scss';
import { Icon as IconDeprecated } from '../Icon/Icon';
import StarIcon from '@/shared/assets/icons/star.svg';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '../../redesigned/Icon';

interface RaitingProps {
    className?: string
    onSelect?: (star: number) => void
    size?: number
    selectedStars?: number
}

const stars = [1, 2, 3, 4, 5];
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Raiting: FC<RaitingProps> = memo(
    ({
        className, onSelect, selectedStars = 0, size = 30,
    }) => {
        const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
        const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

        const onHover = (star: number) => () => {
            if (!isSelected) {
                setCurrentStarsCount(star);
            }
        };

        const onLeave = () => {
            if (!isSelected) {
                setCurrentStarsCount(0);
            }
        };

        const onClick = (star: number) => () => {
            if (!isSelected) {
                onSelect?.(star);
                setCurrentStarsCount(star);
                setIsSelected(true);
            }
        };

        return (
            <div
                className={classNames(
                    toggleFeatures({
                        name: 'isAppRedesigned',
                        on: () => cls.RaitingRedesigned,
                        off: () => cls.Raiting,
                    }),
                    {},
                    [className],
                )}
            >
                {stars.map((star) => {
                    const commonProps = {
                        Svg: StarIcon,
                        key: star,
                        className: classNames(
                            cls.starIcon,
                            { [cls.isSelected]: isSelected },
                            [
                                currentStarsCount >= star
                                    ? cls.hovered
                                    : cls.normal,
                            ],
                        ),
                        width: size,
                        height: size,
                        onMouseLeave: onLeave,
                        onMouseEnter: onHover(star),
                        onClick: onClick(star),
                        'data-testid': `Rating.${star}`,
                        'data-selected': currentStarsCount >= star,
                    };

                    return (
                        <ToggleFeatures
                            name="isAppRedesigned"
                            on={(
                                <Icon
                                    clickable={!isSelected}
                                    {...commonProps}
                                />
                            )}
                            off={<IconDeprecated {...commonProps} />}
                        />
                    );
                })}
            </div>
        );
    },
);
