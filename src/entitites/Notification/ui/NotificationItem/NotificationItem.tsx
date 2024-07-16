import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Notification } from '../../model/types/NotificationSchema';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem: FC<NotificationItemProps> = memo(
    ({ className, item }) => {
        const content = (
            <Card
                theme={CardTheme.OUTLINE}
                className={classNames(cls.NotificationItem, {}, [className])}
            >
                <Text title={item.title} text={item.description} />
            </Card>
        );

        if (item.href) {
            return (
                <AppLink className={cls.link} target="_blank" to={item.href}>
                    {content}
                </AppLink>
            );
        }

        return content;
    },
);
