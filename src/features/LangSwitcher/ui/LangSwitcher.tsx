import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

interface LangSwitcherProps {
    className?: string
    short?: boolean
}
export const LangSwitcher: FC<LangSwitcherProps> = memo(
    ({ className, short }) => {
        const { t, i18n } = useTranslation();

        const toggle = async () => {
            i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
        };

        return (
            <ToggleFeatures
                name="isAppRedesigned"
                on={(
                    <Button variant="clear" onClick={toggle}>
                        {t(short ? 'Короткий язык' : 'Язык')}
                    </Button>
                )}
                off={(
                    <ButtonDeprecated
                        theme={ThemeButton.CLEAR}
                        onClick={toggle}
                        className={classNames('', {}, [className])}
                    >
                        {t(short ? 'Короткий язык' : 'Язык')}
                    </ButtonDeprecated>
                )}
            />
        );
    },
);
