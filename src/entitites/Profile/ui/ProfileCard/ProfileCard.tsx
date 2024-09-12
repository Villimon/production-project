import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Country } from '@/entitites/Country';
import { Currency } from '@/entitites/Currency';
import { Profile } from '../../model/types/profile';
import { ToggleFeatures } from '@/shared/lib/features';
import { ProfileCardRedesigned } from '../ProfileCardRedesigned/ProfileCardRedesigned';
import { ProfileCardDeprecated } from '../ProfileCardDeprecated/ProfileCardDeprecated';

export interface ProfileCardProps {
    className?: string
    data?: Profile
    error?: string
    isLoading?: boolean
    readonly?: boolean
    onChangeFirstname?: (value?: string) => void
    onChangeLastname?: (value?: string) => void
    onChangeAge?: (value?: string) => void
    onChangeCity?: (value?: string) => void
    onChangeUsername?: (value?: string) => void
    onChangeAvatar?: (value?: string) => void
    onChangeCurrency?: (currency: Currency) => void
    onChangeCountry?: (country: Country) => void
}
// entiti слои не должны иметь логику внутри себя, это переисбользуемые блоки в которые поступает логика
export const ProfileCard: FC<ProfileCardProps> = memo((props) => {
    const { className, error, isLoading } = props;
    const { t } = useTranslation('profile');

    // if (isLoading) {
    //     return (
    //         <HStack
    //             max
    //             justify="center"
    //             className={classNames(cls.ProfileCard, {}, [
    //                 className,
    //                 cls.loading,
    //             ])}
    //         >
    //             <Loader />
    //         </HStack>
    //     )
    // }

    // if (error) {
    //     return (
    //         <HStack
    //             max
    //             justify="center"
    //             className={classNames(cls.ProfileCard, {}, [
    //                 className,
    //                 cls.error,
    //             ])}
    //         >
    //             <Text
    //                 theme={TextTheme.ERROR}
    //                 text={t('Попробуйте обновить страницу')}
    //                 title={t('Произошла ошибка при загрузке профиля')}
    //                 aligh={TextAlign.CENTER}
    //             />
    //         </HStack>
    //     )
    // }

    return (
        <ToggleFeatures
            name="isAppRedesigned"
            on={<ProfileCardRedesigned {...props} />}
            off={<ProfileCardDeprecated {...props} />}
        />
    );
});
