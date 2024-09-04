import { useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Theme } from '@/shared/constants/theme';

interface UseThemeResult {
    toggleTheme: (saveAction?: (theme: Theme) => void) => void
    theme: Theme
}

export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

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
        saveAction?.(newTheme);
    };

    return { theme: theme || Theme.LIGHT, toggleTheme };
};
