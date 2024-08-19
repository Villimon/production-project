import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { EditablePofileCard } from '@/features/editablePofileCard';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import cls from './ProfilePage.module.scss';
import { ProfileRating } from '@/features/profileRating';

interface ProfilePageProps {
    className?: string
}
const ProfilePage: FC<ProfilePageProps> = memo(({ className }) => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return null;
    }
    return (
        <Page
            data-testid="ProfilePage"
            className={classNames(cls.ProfilePage, {}, [className])}
        >
            <VStack gap="16" max>
                <EditablePofileCard id={id} />
                <ProfileRating profileId={id} />
            </VStack>
        </Page>
    );
});

export default ProfilePage;
