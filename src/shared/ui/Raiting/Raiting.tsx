import { FC, memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Raiting.module.scss';
import { Icon } from '../Icon/Icon';
import StarIcon from '@/shared/assets/icons/star.svg';

interface RaitingProps {
    className?: string
    onSelect?: (star: number) => void
    size?: number
    selectedStars?: number
}

const stars = [1, 2, 3, 4, 5];

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
            <div className={classNames(cls.Raiting, {}, [className])}>
                {stars.map((star) => (
                    <Icon
                        Svg={StarIcon}
                        key={star}
                        className={classNames(
                            cls.starIcon,
                            { [cls.isSelected]: isSelected },
                            [
                                currentStarsCount >= star
                                    ? cls.hovered
                                    : cls.normal,
                            ],
                        )}
                        width={size}
                        height={size}
                        onMouseLeave={onLeave}
                        onMouseEnter={onHover(star)}
                        onClick={onClick(star)}
                    />
                ))}
            </div>
        );
    },
);
