import { Suspense, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInited, initAuthData } from '@/entitites/User';
import { classNames } from '../shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { useAppToolbar } from './lib/useAppToolbar';
import { useVisibleAppToolbar } from './lib/useVisibleAppToolbar';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';

// Сделать так чтобы деплой проходил успешно
// Поправить все тесты, линты.
// Документация и сторикейсы
// Обновить наш плагин еслинта до 0.0.10
// Расширение в браузер pixel perfect plugin
// !!!TODO
// 1.Урок 63 Виртуализация
// Сделать Виртуализацию, штука позволяет оптимизировать большие списки, в нашем случае список статей
// Можно использовать react-virtuoso (урок 63)
// 2.Сделать добавление и обновление статей
// Вернуться к 45 уроку, чтобы настроить удобную штуку в проекте
const App = memo(() => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);
    const toolbar = useAppToolbar();
    const visibleToolbar = useVisibleAppToolbar();

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!inited) {
        return (
            <ToggleFeatures
                name="isAppRedesigned"
                on={(
                    <div
                        id="app"
                        className={classNames('app_redesigned', {}, [theme])}
                    >
                        <AppLoaderLayout />
                    </div>
                )}
                off={<PageLoader />}
            />
        );
    }

    return (
        <ToggleFeatures
            name="isAppRedesigned"
            on={(
                <div
                    id="app"
                    className={classNames('app_redesigned', {}, [theme])}
                >
                    <Suspense fallback="">
                        <MainLayout
                            content={<AppRouter />}
                            header={<Navbar />}
                            sidebar={<Sidebar />}
                            toolbar={visibleToolbar ? toolbar : undefined}
                        />
                    </Suspense>
                </div>
            )}
            off={(
                <div id="app" className={classNames('app', {}, [theme])}>
                    <Suspense fallback="">
                        <Navbar />
                        <div className="content-page">
                            <Sidebar />
                            <AppRouter />
                        </div>
                    </Suspense>
                </div>
            )}
        />
    );
});

export default withTheme(App);
