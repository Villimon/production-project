import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import { getUserData } from 'entitites/User';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { profileActions } from '../../model/slice/profileSlice';
import cls from './ProfilePageHeader.module.scss';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';

interface ProfilePageHeaderProps {
    className?: string;
}
export const ProfilePageHeader: FC<ProfilePageHeaderProps> = memo(
    ({ className }) => {
        const { t } = useTranslation('profile');
        const readonly = useSelector(getProfileReadonly);
        const dispatch = useAppDispatch();
        const authData = useSelector(getUserData);
        const profileData = useSelector(getProfileData);
        const canEdit = authData?.id === profileData?.id;
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
                {canEdit && (
                    <div className={cls.btnsWrapper}>
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
                )}
            </div>
        );
    },
);
