import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>
    inverted?: boolean
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Icon: FC<IconProps> = memo(
    ({
        className, Svg, inverted, ...otherProps
    }) => (
        <Svg
            className={classNames(inverted ? cls.inverted : cls.Icon, {}, [
                className,
            ])}
            {...otherProps}
        />
    ),
);
