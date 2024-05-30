import { profileActions } from 'pages/ProfilePage';
import { getProfileReadonly } from 'pages/ProfilePage/model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from 'pages/ProfilePage/model/services/updateProfileData/updateProfileData';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
    className?: string;
}
export const ProfilePageHeader: FC<ProfilePageHeaderProps> = memo(
    ({ className }) => {
        const { t } = useTranslation('profile');
        const readonly = useSelector(getProfileReadonly);
        const dispatch = useAppDispatch();

        const onEdit = useCallback(() => {
            dispatch(profileActions.setReadonly(false));
        }, [dispatch]);

        const onCancelEdit = useCallback(() => {
            dispatch(profileActions.cancelEdit());
        }, [dispatch]);

        const onSave = useCallback(() => {
            dispatch(updateProfileData());
        }, [dispatch]);

        return (
            <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
                <Text title={t('Профиль')} />
                {readonly ? (
                    <Button
                        onClick={onEdit}
                        className={cls.esitBtn}
                        theme={ThemeButton.OUTLINE}
                    >
                        {t('Редактировать')}
                    </Button>
                ) : (
                    <>
                        <Button
                            onClick={onCancelEdit}
                            className={cls.esitBtn}
                            theme={ThemeButton.RED}
                        >
                            {t('Отменить')}
                        </Button>
                        <Button
                            onClick={onSave}
                            className={cls.saveBtn}
                            theme={ThemeButton.OUTLINE}
                        >
                            {t('Сохранить')}
                        </Button>
                    </>
                )}
            </div>
        );
    },
);
