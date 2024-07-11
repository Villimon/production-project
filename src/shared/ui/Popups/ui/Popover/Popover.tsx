import { FC, memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Popover as HPopover } from '@headlessui/react';
import { DropdawnDirection } from 'shared/types/ui';
import cls from './Popover.module.scss';
import popupCls from '../../styles/popup.module.scss';

interface PopoverProps {
    className?: string;
    trigger: ReactNode;
    direction?: DropdawnDirection;
    children: ReactNode;
}
export const Popover: FC<PopoverProps> = memo(
    ({
        className, trigger, direction = 'bottom-right', children,
    }) => (
        <HPopover
            className={classNames(cls.Popover, {}, [
                className,
                popupCls.popup,
            ])}
        >
            <HPopover.Button className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>

            <HPopover.Panel
                className={classNames(cls.popover, {}, [cls[direction]])}
            >
                {children}
            </HPopover.Panel>
        </HPopover>
    ),
);
