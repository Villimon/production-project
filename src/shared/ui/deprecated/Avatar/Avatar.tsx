import {
    CSSProperties, FC, memo, useMemo,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../AppImage/AppImage';
import UserIcon from '@/shared/assets/icons/user-icon.svg';
import { Skeleton } from '../Skeleton';
import { Icon } from '../Icon';

interface AvatarProps {
    className?: string
    src?: string
    size?: number
    alt?: string
    fallbackInverted?: boolean
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Avatar: FC<AvatarProps> = memo(
    ({
        src, className, size = 100, alt, fallbackInverted,
    }) => {
        const styles = useMemo<CSSProperties>(
            () => ({
                width: size,
                height: size,
            }),
            [size],
        );

        const errorFallback = (
            <Icon
                inverted={fallbackInverted}
                width={size}
                height={size}
                Svg={UserIcon}
            />
        );
        const fallback = <Skeleton width={size} height={size} border="50%" />;

        return (
            <AppImage
                fallback={fallback}
                errorFallback={errorFallback}
                src={src}
                style={styles}
                className={classNames(cls.Avatar, {}, [className])}
                alt={alt}
            />
        );
    },
);
