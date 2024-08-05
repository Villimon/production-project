import { createContext } from 'react';
import { Theme } from '@/shared/constants/theme';

export interface ThemeContextProps {
    theme?: Theme
    setTheme?: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({});
