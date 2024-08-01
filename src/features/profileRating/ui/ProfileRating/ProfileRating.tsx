import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entitites/RatingCard';
import { useGetProfileRating, useRateProfile } from '../../api/articleRatingApi';
import { getUserData } from '@/entitites/User';

interface ProfileRatingProps {
    className?: string
    profileId: string
}

export const ProfileRating: FC<ProfileRatingProps> = memo(
    ({ className, profileId }) => {
        const { t } = useTranslation('profile');
        const userData = useSelector(getUserData);
        const { data, isLoading } = useGetProfileRating({
            profileId,
            userId: userData?.id ?? '',
        });
        const [rateProfileMutatuin] = useRateProfile();
        const rating = data?.[0];

        const handleRateProfile = useCallback(
            (star: number, feedback?: string) => {
                try {
                    rateProfileMutatuin({
                        profileId,
                        rate: star,
                        userId: userData?.id ?? '',
                        feedback,
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            [userData?.id, profileId, rateProfileMutatuin],
        );
        const onAccept = useCallback(
            (star: number, feedback?: string) => {
                handleRateProfile(star, feedback);
            },
            [handleRateProfile],
        );
        const onCancle = useCallback(
            (star: number) => {
                handleRateProfile(star);
            },
            [handleRateProfile],
        );

        if (isLoading) {
            return null;
        }

        return (
            <RatingCard
                className={className}
                feedbackTitle={t('Оставьте свой отзыв об пользователе')}
                title={t('Оцените профиль')}
                hasFeedback
                onAccept={onAccept}
                onCancle={onCancle}
                rate={rating?.rate}
            />
        );
    },
);
