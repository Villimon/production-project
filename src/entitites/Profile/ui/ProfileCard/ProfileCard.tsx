import { Country, CountrySelect } from 'entitites/Country';
import { Currency, CurrencySelect } from 'entitites/Currency';
import { Profile } from 'pages/ProfilePage';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeFirstname?: (value?: string) => void;
    onChangeLastname?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountry?: (country: Country) => void;
}
// entiti слои не должны иметь логику внутри себя, это переисбользуемые блоки в которые поступает логика
export const ProfileCard: FC<ProfileCardProps> = memo(
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
                    className={classNames(cls.ProfileCard, {}, [
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
                    className={classNames(cls.ProfileCard, {}, [
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
                    cls.ProfileCard,
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
                />
                <Input
                    className={cls.input}
                    placeholder={t('Ваша фамилия')}
                    value={data?.lastname}
                    onChange={onChangeLastname}
                    readonly={readonly}
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
