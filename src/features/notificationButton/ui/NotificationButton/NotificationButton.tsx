import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg';
import { Popover } from 'shared/ui/Popups';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { NotificationList } from 'entitites/Notification';
import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}
// Не до конца понял почему это фича
export const NotificationButton: FC<NotificationButtonProps> = memo(
    ({ className }) => (
        <Popover
            className={classNames(cls.NotificationButton, {}, [className])}
            direction="bottom-left"
            trigger={(
                <Button theme={ThemeButton.CLEAR}>
                    <Icon inverted Svg={NotificationIcon} />
                </Button>
            )}
        >
            <NotificationList className={cls.notifications} />
        </Popover>
    ),
);
