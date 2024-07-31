import {
    FC, memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { Raiting } from '@/shared/ui/Raiting/Raiting';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

interface RatingCardProps {
    className?: string
    title?: string
    feadbackTitle?: string
    hasFeadback?: boolean
    onCancle?: (star: number) => void
    onAccept?: (star: number, feadback?: string) => void
}

export const RatingCard: FC<RatingCardProps> = memo(
    ({
        className, feadbackTitle, hasFeadback, onAccept, onCancle, title,
    }) => {
        const { t } = useTranslation();
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [starsCount, setStarsCount] = useState(0);
        const [feadback, setFeadback] = useState('');
        const isMobile = useDevice();

        const onSelectStars = useCallback(
            (selectedStarsCount: number) => {
                setStarsCount(selectedStarsCount);
                if (hasFeadback) {
                    setIsModalOpen(true);
                } else {
                    onAccept?.(selectedStarsCount);
                }
            },
            [onAccept, hasFeadback],
        );

        const onAcceptHandle = useCallback(() => {
            setIsModalOpen(false);
            onAccept?.(starsCount, feadback);
        }, [onAccept, feadback, starsCount]);

        const onCancelHandle = useCallback(() => {
            setIsModalOpen(false);
            onAccept?.(starsCount);
        }, [onAccept, starsCount]);

        const modalContent = (
            <>
                <Text title={feadbackTitle} />
                <Input
                    value={feadback}
                    onChange={setFeadback}
                    placeholder={t('Ваш отзыв')}
                />
            </>
        );

        return (
            <Card className={classNames('', {}, [className])}>
                <VStack align="center" gap="8">
                    <Text title={title} />
                    <Raiting size={40} onSelect={onSelectStars} />
                </VStack>
                {isMobile ? (
                    <Drawer isOpen={isModalOpen} lazy>
                        <VStack gap="32" max>
                            {modalContent}
                            <HStack max gap="16" justify="end">
                                <Button fullWidth onClick={onAcceptHandle}>
                                    {t('Отправить')}
                                </Button>
                            </HStack>
                        </VStack>
                    </Drawer>
                ) : (
                    <Modal isOpen={isModalOpen} lazy>
                        <VStack gap="32" max>
                            {modalContent}
                            <HStack max gap="16" justify="end">
                                <Button
                                    onClick={onCancelHandle}
                                    theme={ThemeButton.RED}
                                >
                                    {t('Закрыть')}
                                </Button>
                                <Button onClick={onAcceptHandle}>
                                    {t('Отправить')}
                                </Button>
                            </HStack>
                        </VStack>
                    </Modal>
                )}
            </Card>
        );
    },
);
