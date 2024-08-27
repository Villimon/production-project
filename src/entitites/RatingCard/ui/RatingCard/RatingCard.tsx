import {
    FC, memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Raiting } from '@/shared/ui/Raiting';
import { Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';
import { Drawer } from '@/shared/ui/Drawer';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancle?: (star: number) => void;
    onAccept?: (star: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard: FC<RatingCardProps> = memo(
    ({
        className,
        feedbackTitle,
        hasFeedback,
        onAccept,
        onCancle,
        title,
        rate = 0,
    }) => {
        const { t } = useTranslation();
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [starsCount, setStarsCount] = useState(rate);
        const [feedback, setfeedback] = useState('');
        const isMobile = useDevice();

        const onSelectStars = useCallback(
            (selectedStarsCount: number) => {
                setStarsCount(selectedStarsCount);
                if (hasFeedback) {
                    setIsModalOpen(true);
                } else {
                    onAccept?.(selectedStarsCount);
                }
            },
            [onAccept, hasFeedback],
        );

        const onAcceptHandle = useCallback(() => {
            setIsModalOpen(false);
            onAccept?.(starsCount, feedback);
        }, [onAccept, feedback, starsCount]);

        const onCancelHandle = useCallback(() => {
            setIsModalOpen(false);
            onAccept?.(starsCount);
        }, [onAccept, starsCount]);

        const modalContent = (
            <>
                <Text title={feedbackTitle} />
                <Input
                    data-testid="RatingCard.Input"
                    value={feedback}
                    onChange={setfeedback}
                    placeholder={t('Ваш отзыв')}
                />
            </>
        );

        return (
            <Card
                data-testid="RatingCard"
                fullWidth
                className={classNames('', {}, [className])}
            >
                <VStack align="center" gap="8">
                    <Text title={starsCount ? t('Спасибо за оценку') : title} />
                    <Raiting
                        selectedStars={rate}
                        size={40}
                        onSelect={onSelectStars}
                    />
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
                                    data-testid="RatingCard.Close"
                                >
                                    {t('Закрыть')}
                                </Button>
                                <Button
                                    data-testid="RatingCard.Send"
                                    onClick={onAcceptHandle}
                                >
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
