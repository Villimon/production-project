import { createSelector } from '@reduxjs/toolkit';
import { getUserData } from '@/entitites/User';
import AboutIconDeprecated from '@/shared/assets/icons/about.svg';
import MainIconDeprecated from '@/shared/assets/icons/main.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg';

import AboutIcon from '@/shared/assets/icons/Info.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';

import { SidebarItemType } from '../types/sidebar';
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from '@/shared/constants/router';
import { toggleFeatures } from '@/shared/lib/features';

export const getSidebaritems = createSelector(getUserData, (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            text: 'Главная страница',
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => MainIconDeprecated,
                on: () => MainIcon,
            }),
        },
        {
            path: getRouteAbout(),
            text: 'О сайте',
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => AboutIconDeprecated,
                on: () => AboutIcon,
            }),
        },
    ];

    if (userData) {
        sidebarItemsList.push(
            {
                path: getRouteProfile(userData?.id),
                text: 'Профиль',
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => ProfileIconDeprecated,
                    on: () => ProfileIcon,
                }),
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                text: 'Статья',
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => ArticleIconDeprecated,
                    on: () => ArticleIcon,
                }),
                authOnly: true,
            },
        );
    }

    return sidebarItemsList;
});
