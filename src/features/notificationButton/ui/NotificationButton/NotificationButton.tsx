import {
    FC, memo, useCallback, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg';
import { Popover } from '@/shared/ui/Popups';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import { NotificationList } from '@/entitites/Notification';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';
import { AnimationProvider } from '@/shared/lib/components/AnimationProvider';
import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
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
            <Button onClick={onOpenDrawer} theme={ThemeButton.CLEAR}>
                <Icon inverted Svg={NotificationIcon} />
            </Button>
        );

        return (
            <div>
                {isMobile ? (
                    <>
                        {trigger}
                        {isOpen && (
                            <AnimationProvider>
                                <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                                    <NotificationList />
                                </Drawer>
                            </AnimationProvider>
                        )}
                    </>
                ) : (
                    <Popover
                        className={classNames(cls.NotificationButton, {}, [
                            className,
                        ])}
                        direction="bottom-left"
                        trigger={trigger}
                    >
                        <NotificationList className={cls.notifications} />
                    </Popover>
                )}
            </div>
        );
    },
);
