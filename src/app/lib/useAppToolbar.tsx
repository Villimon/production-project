import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { AppRoutes } from '@/shared/constants/router';
import { useRouteChange } from '@/shared/lib/router/useRouteChange/useRouteChange';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T
}

export function useAppToolbar() {
    const appRoute = useRouteChange();
    const { t } = useTranslation();

    const toolbarByAppRouter: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.ARTICLES]: <ScrollToolbar />,
        [AppRoutes.ARTICLES_DETAILS]: <ScrollToolbar />,
        [AppRoutes.ABOUT]: <div>{t('О сайте')}</div>,
        [AppRoutes.MAIN]: <div>{t('Главная')}</div>,
    };

    return toolbarByAppRouter[appRoute];
}
