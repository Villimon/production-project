import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CountrySelect } from '@/entitites/Country';
import { CurrencySelect } from '@/entitites/Currency';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { Text } from '@/shared/ui/redesigned/Text';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Input } from '@/shared/ui/redesigned/Input';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

// entiti слои не должны иметь логику внутри себя, это переисбользуемые блоки в которые поступает логика
export const ProfileCardRedesigned: FC<ProfileCardProps> = memo(
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
                <Card padding="24" fullWidth>
                    <VStack gap="32">
                        <HStack gap="32" max justify="center">
                            <Skeleton border="100%" width={128} height={128} />
                        </HStack>
                        <HStack gap="32" max>
                            <VStack gap="16" max>
                                <Skeleton width="100%" height={38} />
                                <Skeleton width="100%" height={38} />
                                <Skeleton width="100%" height={38} />
                                <Skeleton width="100%" height={38} />
                            </VStack>
                            <VStack gap="16" max>
                                <Skeleton width="100%" height={38} />
                                <Skeleton width="100%" height={38} />
                                <Skeleton width="100%" height={38} />
                                <Skeleton width="100%" height={38} />
                            </VStack>
                        </HStack>
                    </VStack>
                </Card>
            );
        }

        if (error) {
            return (
                <HStack max justify="center" className={className}>
                    <Text
                        variant="error"
                        text={t('Попробуйте обновить страницу')}
                        title={t('Произошла ошибка при загрузке профиля')}
                        align="center"
                    />
                </HStack>
            );
        }

        return (
            <Card fullWidth padding="24" className={className}>
                <VStack gap="16" max>
                    {data?.avatar && (
                        <HStack justify="center" max>
                            <Avatar size={128} src={data?.avatar} />
                        </HStack>
                    )}
                    <HStack gap="24" max align="start">
                        <VStack gap="16" max>
                            <Input
                                label={t('Ваше имя')}
                                value={data?.first}
                                onChange={onChangeFirstname}
                                readonly={readonly}
                                data-testid="ProfileCard.first"
                            />
                            <Input
                                label={t('Ваша фамилия')}
                                value={data?.lastname}
                                onChange={onChangeLastname}
                                readonly={readonly}
                                data-testid="ProfileCard.lastname"
                            />
                            <Input
                                label={t('Ваш возраст')}
                                value={data?.age}
                                onChange={onChangeAge}
                                readonly={readonly}
                            />
                            <Input
                                label={t('Город')}
                                value={data?.city}
                                onChange={onChangeCity}
                                readonly={readonly}
                            />
                        </VStack>
                        <VStack gap="16" max>
                            <Input
                                label={t('Введите имя пользователя')}
                                value={data?.username}
                                onChange={onChangeUsername}
                                readonly={readonly}
                            />
                            <Input
                                label={t('Введите ссылку на аватар')}
                                value={data?.avatar}
                                onChange={onChangeAvatar}
                                readonly={readonly}
                            />
                            <CurrencySelect
                                value={data?.currency}
                                onChange={onChangeCurrency}
                                readonly={readonly}
                            />
                            <CountrySelect
                                value={data?.country}
                                onChange={onChangeCountry}
                                readonly={readonly}
                            />
                        </VStack>
                    </HStack>
                </VStack>
            </Card>
        );
    },
);
