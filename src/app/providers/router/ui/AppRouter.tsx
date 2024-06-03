import { getUserData } from 'entitites/User';
import {
    memo, Suspense, useCallback, useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import {
    AppRoutesProps,
    routeConfig,
} from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader';
import { RequierAuth } from './RequierAuth';

export const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = <div className="page-wrapper">{route.element}</div>;

        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? (
                        <RequierAuth>{element}</RequierAuth>
                    ) : (
                        element
                    )
                }
            />
        );
    }, []);

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
        </Suspense>
    );
};
