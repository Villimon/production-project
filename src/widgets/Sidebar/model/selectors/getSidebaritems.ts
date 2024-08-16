import { createSelector } from '@reduxjs/toolkit';
import { getUserData } from '@/entitites/User';
import AboutIcon from '@/shared/assets/icons/about.svg';
import MainIcon from '@/shared/assets/icons/main.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg';
import { SidebarItemType } from '../types/sidebar';
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from '@/shared/constants/router';

export const getSidebaritems = createSelector(getUserData, (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            text: 'Главная страница',
            Icon: MainIcon,
        },
        {
            path: getRouteAbout(),
            text: 'О сайте',
            Icon: AboutIcon,
        },
    ];

    if (userData) {
        sidebarItemsList.push(
            {
                path: getRouteProfile(userData?.id),
                text: 'Профиль',
                Icon: ProfileIcon,
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                text: 'Статья',
                Icon: ArticleIcon,
                authOnly: true,
            },
        );
    }

    return sidebarItemsList;
});
