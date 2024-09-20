import {
    FC, memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { LoginModal } from '@/features/AuthByUsername';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import {
    AppLink as AppLinkDeprecated,
    AppLinkTheme,
} from '@/shared/ui/deprecated/AppLink';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import cls from './Navbar.module.scss';
import { getRouteArticlesCreate } from '@/shared/constants/router';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { getUserData } from '@/entitites/User';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';

interface NavbarProps {
    className?: string
}

export const Navbar: FC<NavbarProps> = memo(() => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserData);

    const onClose = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.NavbarRedesigned,
        off: () => cls.Navbar,
    });

    if (authData) {
        return (
            <ToggleFeatures
                name="isAppRedesigned"
                on={(
                    <header className={classNames(mainClass, {}, [])}>
                        <HStack gap="16" className={cls.actions}>
                            <NotificationButton />
                            <AvatarDropdown />
                        </HStack>
                    </header>
                )}
                off={(
                    <header className={classNames(mainClass, {}, [])}>
                        <TextDeprecated
                            className={cls.appName}
                            title={t('My App')}
                            theme={TextTheme.INVERTED}
                        />
                        <AppLinkDeprecated
                            to={getRouteArticlesCreate()}
                            theme={AppLinkTheme.SECONDARY}
                        >
                            {t('Создать статью')}
                        </AppLinkDeprecated>
                        <HStack gap="16" className={cls.actions}>
                            <NotificationButton />
                            <AvatarDropdown />
                        </HStack>
                    </header>
                )}
            />
        );
    }

    return (
        <header className={classNames(mainClass, {}, [])}>
            <ToggleFeatures
                name="isAppRedesigned"
                on={(
                    <Button
                        variant="clear"
                        className={classNames(cls.links, {}, [])}
                        onClick={onShowModal}
                    >
                        {t('Войти')}
                    </Button>
                )}
                off={(
                    <ButtonDeprecated
                        theme={ThemeButton.CLEAR}
                        className={classNames(cls.links, {}, [])}
                        onClick={onShowModal}
                    >
                        {t('Войти')}
                    </ButtonDeprecated>
                )}
            />
            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onClose} />
            )}
        </header>
    );
});
