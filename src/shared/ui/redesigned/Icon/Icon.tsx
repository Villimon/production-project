import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>

interface IconBaseProps extends SvgProps {
    className?: string
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>
}

interface NonClickableIconProps extends IconBaseProps {
    clickable?: false
}

interface ClickableBaseProps extends IconBaseProps {
    clickable: true
    onClick: () => void
}

type IconProps = NonClickableIconProps | ClickableBaseProps

export const Icon: FC<IconProps> = memo((props) => {
    const {
        className,
        Svg,
        width = 32,
        height = 32,
        clickable,
        ...otherProps
    } = props;
    const icon = (
        <Svg
            width={width}
            height={height}
            className={classNames(cls.Icon, {}, [className])}
            {...otherProps}
            onClick={undefined}
        />
    );

    if (clickable) {
        return (
            <button
                type="button"
                className={cls.button}
                onClick={props.onClick}
                style={{ height, width }}
            >
                {icon}
            </button>
        );
    }

    return icon;
});
