import { EditablePofileCard } from 'features/editablePofileCard';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page';
import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
    className?: string;
}
const ProfilePage: FC<ProfilePageProps> = memo(({ className }) => {
    const { id } = useParams<{ id: string }>();

    return (
        <Page className={classNames(cls.ProfilePage, {}, [className])}>
            <VStack gap="16" max>
                <EditablePofileCard id={id} />
            </VStack>
        </Page>
    );
});

export default ProfilePage;
