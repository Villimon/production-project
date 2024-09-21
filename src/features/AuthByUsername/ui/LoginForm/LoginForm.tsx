import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import cls from './LoginForm.module.scss';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useForceUpdate } from '@/shared/lib/render/renderUpdate';

export interface LoginFormProps {
    className?: string
    onSuccess: () => void
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm: FC<LoginFormProps> = memo(({ className, onSuccess }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);
    const forceUpdate = useForceUpdate();

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
            // Если при смене пользователя будет непонтно отрисовываться интерфейс между новым и старым, то включить эту функцию
            // forceUpdate()
        }
    }, [dispatch, username, password, onSuccess]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <ToggleFeatures
                name="isAppRedesigned"
                on={(
                    <VStack
                        gap="8"
                        className={classNames(cls.LoginForm, {}, [className])}
                    >
                        <Text title={t('Форма авторизации')} />
                        {error && (
                            <Text
                                variant="error"
                                text={t('Вы ввели неверный логин или пароль')}
                            />
                        )}
                        <Input
                            autofocus
                            type="text"
                            className={cls.input}
                            placeholder={t('Логин')}
                            onChange={onChangeUsername}
                            value={username}
                        />
                        <Input
                            type="text"
                            className={cls.input}
                            placeholder={t('Пароль')}
                            onChange={onChangePassword}
                            value={password}
                        />
                        <Button
                            onClick={onLoginClick}
                            variant="outline"
                            className={cls.loginBtn}
                            disabled={isLoading}
                        >
                            {t('Войти')}
                        </Button>
                    </VStack>
                )}
                off={(
                    <div className={classNames(cls.LoginForm, {}, [className])}>
                        <TextDeprecated title={t('Форма авторизации')} />
                        {error && (
                            <TextDeprecated
                                theme={TextTheme.ERROR}
                                text={t('Вы ввели неверный логин или пароль')}
                            />
                        )}
                        <InputDeprecated
                            autofocus
                            type="text"
                            className={cls.input}
                            placeholder={t('Логин')}
                            onChange={onChangeUsername}
                            value={username}
                        />
                        <InputDeprecated
                            type="text"
                            className={cls.input}
                            placeholder={t('Пароль')}
                            onChange={onChangePassword}
                            value={password}
                        />
                        <ButtonDeprecated
                            onClick={onLoginClick}
                            theme={ThemeButton.OUTLINE}
                            className={cls.loginBtn}
                            disabled={isLoading}
                        >
                            {t('Войти')}
                        </ButtonDeprecated>
                    </div>
                )}
            />
        </DynamicModuleLoader>
    );
});

export default LoginForm;
