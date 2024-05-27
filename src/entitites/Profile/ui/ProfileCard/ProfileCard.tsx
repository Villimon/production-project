import { getProfileData } from 'entitites/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileError } from 'entitites/Profile/model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from 'entitites/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text } from 'shared/ui/Text/Text';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
}
export const ProfileCard: FC<ProfileCardProps> = ({ className }) => {
    const { t } = useTranslation('profile');

    const data = useSelector(getProfileData);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);

    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <div className={cls.header}>
                <Text title={t('Профиль')} />
                <Button className={cls.esitBtn} theme={ThemeButton.OUTLINE}>
                    {t('Редактировать')}
                </Button>
            </div>
            <div className={cls.data}>
                <Input
                    className={cls.input}
                    placeholder={t('Ваше имя')}
                    value={data?.first}
                />
                <Input
                    className={cls.input}
                    placeholder={t('Ваша фамилия')}
                    value={data?.lastname}
                />
            </div>
        </div>
    );
};
