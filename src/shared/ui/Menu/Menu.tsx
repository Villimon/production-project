import {
    FC, Fragment, memo, ReactNode,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Menu as HMenu } from '@headlessui/react';
import { DropdawnDirection } from 'shared/types/ui';
import cls from './Menu.module.scss';
import { AppLink } from '../AppLink/AppLink';

export interface MenuItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface MenuProps {
    className?: string;
    items: MenuItem[];
    trigger: ReactNode;
    direction?: DropdawnDirection;
}

export const Menu: FC<MenuProps> = memo(
    ({
        className, items, trigger, direction = 'bottom-right',
    }) => (
        <HMenu as="div" className={classNames(cls.Menu, {}, [className])}>
            <HMenu.Button className={cls.btn}>{trigger}</HMenu.Button>
            <HMenu.Items
                className={classNames(cls.menu, {}, [cls[direction]])}
            >
                {items.map((item) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            onClick={item.onClick}
                            className={classNames(
                                cls.item,
                                { [cls.active]: active },
                                [],
                            )}
                            disabled={item.disabled}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <HMenu.Item
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                            >
                                {content}
                            </HMenu.Item>
                        );
                    }

                    return (
                        <HMenu.Item as={Fragment} disabled={item.disabled}>
                            {content}
                        </HMenu.Item>
                    );
                })}
            </HMenu.Items>
        </HMenu>
    ),
);
