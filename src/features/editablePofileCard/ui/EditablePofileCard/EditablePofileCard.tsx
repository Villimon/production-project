import {
    FC, memo, useCallback, useEffect,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Currency } from 'entitites/Currency';
import { Country } from 'entitites/Country';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { ProfileCard } from 'entitites/Profile';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from 'shared/ui/Stack';
import { ValidateProfileErrors } from '../../model/consts/consts';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { ProfilePageHeader } from '../ProfilePageHeader/ProfilePageHeader';

interface EditablePofileCardProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    profile: profileReducer,
};

export const EditablePofileCard: FC<EditablePofileCardProps> = memo(
    ({ className, id }) => {
        const { t } = useTranslation('profile');
        const dispatch = useAppDispatch();
        const formData = useSelector(getProfileForm);
        const error = useSelector(getProfileError);
        const isLoading = useSelector(getProfileIsLoading);
        const readonly = useSelector(getProfileReadonly);
        const validateErrors = useSelector(getProfileValidateErrors);

        const validateErrorTranslation = {
            [ValidateProfileErrors.INCORRECT_AGE]: t('Некорректный возраст'),
            [ValidateProfileErrors.INCORRECT_COUNTRY]: t('Некорректный регион'),
            [ValidateProfileErrors.INCORRECT_USER_DATA]: t(
                'Имя и фамилия обязательны',
            ),
            [ValidateProfileErrors.NO_DATA]: t('Данные не указаны'),
            [ValidateProfileErrors.SERVER_ERROR]: t('Серверная ошибка'),
        };

        useEffect(() => {
            if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') {
                if (id) {
                    dispatch(fetchProfileData(id));
                }
            }
        }, [dispatch, id]);

        const onChangeFirstname = useCallback(
            (value?: string) => {
                dispatch(profileActions.updateProfile({ first: value || '' }));
            },
            [dispatch],
        );

        // Есди функцию передаем пропсом, то тогда оборачиваем ее в useCallback
        const onChangeLastname = useCallback(
            (value?: string) => {
                dispatch(
                    profileActions.updateProfile({ lastname: value || '' }),
                );
            },
            [dispatch],
        );

        const onChangeAge = useCallback(
            (value?: string) => {
                if (value && /^\d*$/.test(value)) {
                    dispatch(
                        profileActions.updateProfile({ age: Number(value) }),
                    );
                }
            },
            [dispatch],
        );

        const onChangeCity = useCallback(
            (value?: string) => {
                dispatch(profileActions.updateProfile({ city: value || '' }));
            },
            [dispatch],
        );

        const onChangeUsername = useCallback(
            (value?: string) => {
                dispatch(
                    profileActions.updateProfile({ username: value || '' }),
                );
            },
            [dispatch],
        );

        const onChangeAvatar = useCallback(
            (value?: string) => {
                dispatch(profileActions.updateProfile({ avatar: value || '' }));
            },
            [dispatch],
        );

        const onChangeCurrency = useCallback(
            (currency: Currency) => {
                dispatch(profileActions.updateProfile({ currency }));
            },
            [dispatch],
        );

        const onChangeCountry = useCallback(
            (country: Country) => {
                dispatch(profileActions.updateProfile({ country }));
            },
            [dispatch],
        );

        return (
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
                <VStack max gap="8" className={classNames('', {}, [className])}>
                    <ProfilePageHeader />
                    {validateErrors?.length
                        && validateErrors.map((error) => (
                            <Text
                                key={error}
                                theme={TextTheme.ERROR}
                                text={validateErrorTranslation[error]}
                                data-testid="EditablePofileCard.Error"
                            />
                        ))}
                    <ProfileCard
                        data={formData}
                        error={error}
                        isLoading={isLoading}
                        readonly={readonly}
                        onChangeFirstname={onChangeFirstname}
                        onChangeLastname={onChangeLastname}
                        onChangeAge={onChangeAge}
                        onChangeCity={onChangeCity}
                        onChangeUsername={onChangeUsername}
                        onChangeAvatar={onChangeAvatar}
                        onChangeCurrency={onChangeCurrency}
                        onChangeCountry={onChangeCountry}
                    />
                </VStack>
            </DynamicModuleLoader>
        );
    },
);
