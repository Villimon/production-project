import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Menu as MenuDeprecated } from '@/shared/ui/deprecated/Popups';
import {
    getUserData,
    isUserAdmin,
    isUserManager,
    userActions,
} from '@/entitites/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/constants/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { Menu } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

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

    const items = [
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
    ];

    return (
        <ToggleFeatures
            name="isAppRedesigned"
            on={(
                <Menu
                    className={classNames('', {}, [className])}
                    direction="bottom-left"
                    items={items}
                    trigger={<Avatar size={40} src={authData.avatar} />}
                />
            )}
            off={(
                <MenuDeprecated
                    className={classNames('', {}, [className])}
                    direction="bottom-left"
                    items={items}
                    trigger={(
                        <AvatarDeprecated
                            fallbackInverted
                            size={30}
                            src={authData.avatar}
                        />
                    )}
                />
            )}
        />
    );
});
