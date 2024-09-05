import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInited, initAuthData } from '@/entitites/User';
import { classNames } from '../shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';

// !!!TODO
// 1.Урок 63 Виртуализация
// Сделать Виртуализацию, штука позволяет оптимизировать большие списки, в нашем случае список статей
// Можно использовать react-virtuoso (урок 63)
// 2.Сделать добавление и обновление статей
// Вернуться к 45 уроку, чтобы настроить удобную штуку в проекте
const App = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!inited) {
        return <PageLoader />;
    }

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
};

export default App;
