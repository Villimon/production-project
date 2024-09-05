import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../context/ThemeContext';
import { Theme } from '@/shared/constants/theme';
// eslint-disable-next-line project-my-plugin/layer-imports
import { getUserData } from '@/entitites/User';
import { LOCAL_STORAGE_THEME_KEY } from '../../../constants/localstorage';

interface UseThemeResult {
    toggleTheme: (saveAction?: (theme: Theme) => void) => void
    theme: Theme
}

export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

    // Если пользователь не авторизован, то будем сохранять в локалсторадж тему, чтобы в течение сессии сохранять это значение
    const isAuth = useSelector(getUserData);

    useEffect(() => {
        document.body.classList.add(theme || Theme.LIGHT);

        return () => {
            document.body.classList.remove(theme || Theme.LIGHT);
        };
    }, [theme]);

    const toggleTheme = (saveAction?: (theme: Theme) => void) => {
        let newTheme: Theme;
        switch (theme) {
        case Theme.DARK:
            newTheme = Theme.LIGHT;
            break;
        case Theme.LIGHT:
            newTheme = Theme.PINK;
            break;
        case Theme.PINK:
            newTheme = Theme.DARK;
            break;

        default:
            newTheme = Theme.LIGHT;
        }
        setTheme?.(newTheme);
        document.body.className = newTheme;

        if (!isAuth) {
            localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
        }

        saveAction?.(newTheme);
    };

    return { theme: theme || Theme.LIGHT, toggleTheme };
};
