import {
    FC, memo, useCallback, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import NotificationIconDepreccated from '@/shared/assets/icons/notification-20-20.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { NotificationList } from '@/entitites/Notification';
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';
import cls from './NotificationButton.module.scss';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

interface NotificationButtonProps {
    className?: string
}
// Не до конца понял почему это фича
export const NotificationButton: FC<NotificationButtonProps> = memo(
    ({ className }) => {
        const [isOpen, setIsOpen] = useState(false);
        const isMobile = useDevice();
        const onOpenDrawer = useCallback(() => {
            setIsOpen(true);
        }, []);

        const onCloseDrawer = useCallback(() => {
            setIsOpen(false);
        }, []);

        const trigger = (
            <ToggleFeatures
                name="isAppRedesigned"
                on={(
                    <Icon
                        onClick={onOpenDrawer}
                        clickable
                        Svg={NotificationIcon}
                    />
                )}
                off={(
                    <ButtonDeprecated
                        onClick={onOpenDrawer}
                        theme={ThemeButton.CLEAR}
                    >
                        <IconDeprecated
                            inverted
                            Svg={NotificationIconDepreccated}
                        />
                    </ButtonDeprecated>
                )}
            />
        );

        return (
            <div>
                {isMobile ? (
                    <>
                        {trigger}
                        {isOpen && (
                            <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                                <NotificationList />
                            </Drawer>
                        )}
                    </>
                ) : (
                    <ToggleFeatures
                        name="isAppRedesigned"
                        on={(
                            <Popover
                                className={classNames(
                                    cls.NotificationButton,
                                    {},
                                    [className],
                                )}
                                direction="bottom-left"
                                trigger={trigger}
                            >
                                <NotificationList
                                    className={cls.notifications}
                                />
                            </Popover>
                        )}
                        off={(
                            <PopoverDeprecated
                                className={classNames(
                                    cls.NotificationButton,
                                    {},
                                    [className],
                                )}
                                direction="bottom-left"
                                trigger={trigger}
                            >
                                <NotificationList
                                    className={cls.notifications}
                                />
                            </PopoverDeprecated>
                        )}
                    />
                )}
            </div>
        );
    },
);
