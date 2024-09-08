import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserData } from '@/entitites/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { SidebarItemType } from '../../model/types/sidebar';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item?: SidebarItemType
    collapsed: boolean
}
export const SidebarItem: FC<SidebarItemProps> = memo(({ item, collapsed }) => {
    const { t } = useTranslation();
    const isAuth = useSelector(getUserData);

    if (item?.authOnly && !isAuth) {
        return null;
    }

    return (
        // eslint-disable-next-line
        <>
            {item && (
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    className={classNames(
                        cls.item,
                        { [cls.collapsed]: collapsed },
                        [],
                    )}
                    to={item.path}
                >
                    <item.Icon className={cls.icon} />
                    <span className={cls.link}>{t(item.text)}</span>
                </AppLink>
            )}
        </>
    );
});
