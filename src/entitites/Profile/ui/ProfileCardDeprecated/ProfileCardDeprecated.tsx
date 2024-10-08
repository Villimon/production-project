import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CountrySelect } from '@/entitites/Country';
import { CurrencySelect } from '@/entitites/Currency';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';
import cls from './ProfileCardDeprecated.module.scss';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Input } from '@/shared/ui/deprecated/Input';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';

export const ProfileCardDeprecated: FC<ProfileCardProps> = memo(
    ({
        className,
        data,
        error,
        isLoading,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
    }) => {
        const { t } = useTranslation('profile');

        if (isLoading) {
            return (
                <HStack
                    max
                    justify="center"
                    className={classNames(cls.ProfileCardDeprecated, {}, [
                        className,
                        cls.loading,
                    ])}
                >
                    <Loader />
                </HStack>
            );
        }

        if (error) {
            return (
                <HStack
                    max
                    justify="center"
                    className={classNames(cls.ProfileCardDeprecated, {}, [
                        className,
                        cls.error,
                    ])}
                >
                    <Text
                        theme={TextTheme.ERROR}
                        text={t('Попробуйте обновить страницу')}
                        title={t('Произошла ошибка при загрузке профиля')}
                        aligh={TextAlign.CENTER}
                    />
                </HStack>
            );
        }

        return (
            <VStack
                gap="8"
                max
                className={classNames(
                    cls.ProfileCardDeprecated,
                    { [cls.editing]: !readonly },
                    [className],
                )}
            >
                {data?.avatar && (
                    <HStack justify="center">
                        <Avatar src={data?.avatar} />
                    </HStack>
                )}
                <Input
                    className={cls.input}
                    placeholder={t('Ваше имя')}
                    value={data?.first}
                    onChange={onChangeFirstname}
                    readonly={readonly}
                    data-testid="ProfileCard.first"
                />
                <Input
                    className={cls.input}
                    placeholder={t('Ваша фамилия')}
                    value={data?.lastname}
                    onChange={onChangeLastname}
                    readonly={readonly}
                    data-testid="ProfileCard.lastname"
                />
                <Input
                    className={cls.input}
                    placeholder={t('Ваш возраст')}
                    value={data?.age}
                    onChange={onChangeAge}
                    readonly={readonly}
                />
                <Input
                    className={cls.input}
                    placeholder={t('Город')}
                    value={data?.city}
                    onChange={onChangeCity}
                    readonly={readonly}
                />
                <Input
                    className={cls.input}
                    placeholder={t('Введите имя пользователя')}
                    value={data?.username}
                    onChange={onChangeUsername}
                    readonly={readonly}
                />
                <Input
                    className={cls.input}
                    placeholder={t('Введите ссылку на аватар')}
                    value={data?.avatar}
                    onChange={onChangeAvatar}
                    readonly={readonly}
                />
                <CurrencySelect
                    className={cls.input}
                    value={data?.currency}
                    onChange={onChangeCurrency}
                    readonly={readonly}
                />
                <CountrySelect
                    className={cls.input}
                    value={data?.country}
                    onChange={onChangeCountry}
                    readonly={readonly}
                />
            </VStack>
        );
    },
);
