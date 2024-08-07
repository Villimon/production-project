import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInited, userActions } from '@/entitites/User';
import { classNames } from '../shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

// !!!TODO
// 1.Урок 63 Виртуализация
// Сделать Виртуализацию, штука позволяет оптимизировать большие списки, в нашем случае список статей
// Можно использовать react-virtuoso (урок 63)
// 2.Сделать добавление и обновление статей
// Вернуться к 45 уроку, чтобы настроить удобную штуку в проекте
const App = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

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
