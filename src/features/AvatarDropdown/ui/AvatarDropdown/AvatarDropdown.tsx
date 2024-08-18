import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar';
import { Menu } from '@/shared/ui/Popups';
import {
    getUserData,
    isUserAdmin,
    isUserManager,
    userActions,
} from '@/entitites/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/constants/router';

interface AvatarDropdownProps {
    className?: string
}

export const AvatarDropdown: FC<AvatarDropdownProps> = memo(({ className }) => {
    const { t } = useTranslation();
    const authData = useSelector(getUserData);
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const dispatch = useAppDispatch();

    const isAdminPanelAvaileble = isAdmin || isManager;

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (!authData) {
        return null;
    }

    return (
        <Menu
            className={classNames('', {}, [className])}
            direction="bottom-left"
            items={[
                ...(isAdminPanelAvaileble
                    ? [
                        {
                            content: t('Админ панель'),
                            href: getRouteAdminPanel(),
                        },
                    ]
                    : []),
                {
                    content: t('Профиль'),
                    href: getRouteProfile(authData.id),
                },
                {
                    content: t('Выйти'),
                    onClick: onLogout,
                },
            ]}
            trigger={
                <Avatar fallbackInverted size={30} src={authData.avatar} />
            }
        />
    );
});
