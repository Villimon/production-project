import {
    ReactNode, useEffect, useMemo, useState,
} from 'react';
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';
import { Theme } from '@/shared/constants/theme';
import { useJsonSettings } from '@/entitites/User';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/constants/localstorage';

const fallback = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

interface ThemeProviderProps {
    initialTheme?: Theme
    children: ReactNode
}

const ThemeProvider = ({ children, initialTheme }: ThemeProviderProps) => {
    const { theme: defaultTheme } = useJsonSettings();
    const [isThemeInited, setThemeInited] = useState(false);
    const [theme, setTheme] = useState<Theme>(
        initialTheme || fallback || Theme.LIGHT,
    );

    useEffect(() => {
        if (!isThemeInited && defaultTheme) {
            setTheme(defaultTheme);
            setThemeInited(true);
        }
    }, [defaultTheme, isThemeInited]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    }, [theme]);

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
