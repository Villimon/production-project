import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserData } from '@/entitites/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    AppLink as AppLinkDeprecated,
    AppLinkTheme,
} from '@/shared/ui/deprecated/AppLink';
import { SidebarItemType } from '../../model/types/sidebar';
import cls from './SidebarItem.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';

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
        <ToggleFeatures
            name="isAppRedesigned"
            on={(
                <>
                    {item && (
                        <AppLink
                            className={classNames(
                                cls.itemRedesigned,
                                { [cls.collapsedRedesigned]: collapsed },
                                [],
                            )}
                            to={item.path}
                            activeClassName={cls.active}
                        >
                            <Icon Svg={item.Icon} />
                            <span className={cls.link}>{t(item.text)}</span>
                        </AppLink>
                    )}
                </>
            )}
            off={(
                <>
                    {item && (
                        <AppLinkDeprecated
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
                        </AppLinkDeprecated>
                    )}
                </>
            )}
        />
    );
});
