import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { getUserData } from '@/entitites/User';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { profileActions } from '../../model/slice/profileSlice';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';

interface ProfilePageHeaderProps {
    className?: string
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
            <ToggleFeatures
                name="isAppRedesigned"
                on={(
                    <Card padding="16" border="partial" fullWidth>
                        <HStack
                            max
                            justify="between"
                            className={classNames('', {}, [className])}
                        >
                            <Text title={t('Профиль')} />
                            {canEdit && (
                                <div>
                                    {readonly ? (
                                        <Button
                                            onClick={onEdit}
                                            variant="outline"
                                            data-testid="ProfilePageHeader.EditButton"
                                        >
                                            {t('Редактировать')}
                                        </Button>
                                    ) : (
                                        <HStack gap="8">
                                            <Button
                                                onClick={onCancelEdit}
                                                color="error"
                                                data-testid="ProfilePageHeader.CancelButton"
                                            >
                                                {t('Отменить')}
                                            </Button>
                                            <Button
                                                onClick={onSave}
                                                variant="outline"
                                                color="success"
                                                data-testid="ProfilePageHeader.SaveButton"
                                            >
                                                {t('Сохранить')}
                                            </Button>
                                        </HStack>
                                    )}
                                </div>
                            )}
                        </HStack>
                    </Card>
                )}
                off={(
                    <HStack
                        max
                        justify="between"
                        className={classNames('', {}, [className])}
                    >
                        <TextDeprecated title={t('Профиль')} />
                        {canEdit && (
                            <div>
                                {readonly ? (
                                    <ButtonDeprecated
                                        onClick={onEdit}
                                        theme={ThemeButton.OUTLINE}
                                        data-testid="ProfilePageHeader.EditButton"
                                    >
                                        {t('Редактировать')}
                                    </ButtonDeprecated>
                                ) : (
                                    <HStack gap="8">
                                        <ButtonDeprecated
                                            onClick={onCancelEdit}
                                            theme={ThemeButton.RED}
                                            data-testid="ProfilePageHeader.CancelButton"
                                        >
                                            {t('Отменить')}
                                        </ButtonDeprecated>
                                        <ButtonDeprecated
                                            onClick={onSave}
                                            theme={ThemeButton.OUTLINE}
                                            data-testid="ProfilePageHeader.SaveButton"
                                        >
                                            {t('Сохранить')}
                                        </ButtonDeprecated>
                                    </HStack>
                                )}
                            </div>
                        )}
                    </HStack>
                )}
            />
        );
    },
);
