import {
    FC, memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Raiting } from '@/shared/ui/deprecated/Raiting';
// import { Raiting as RaitingDeprecated } from '@/shared/ui/deprecated/Raiting';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

interface RatingCardProps {
    className?: string
    title?: string
    feedbackTitle?: string
    hasFeedback?: boolean
    onCancle?: (star: number) => void
    onAccept?: (star: number, feedback?: string) => void
    rate?: number
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
            <ToggleFeatures
                name="isAppRedesigned"
                on={(
                    <>
                        <Text title={feedbackTitle} />
                        <Input
                            data-testid="RatingCard.Input"
                            value={feedback}
                            onChange={setfeedback}
                            placeholder={t('Ваш отзыв')}
                        />
                    </>
                )}
                off={(
                    <>
                        <TextDeprecated title={feedbackTitle} />
                        <InputDeprecated
                            data-testid="RatingCard.Input"
                            value={feedback}
                            onChange={setfeedback}
                            placeholder={t('Ваш отзыв')}
                        />
                    </>
                )}
            />
        );

        const content = (
            <>
                <VStack align="center" gap="8">
                    <ToggleFeatures
                        name="isAppRedesigned"
                        on={(
                            <Text
                                title={
                                    starsCount ? t('Спасибо за оценку') : title
                                }
                            />
                        )}
                        off={(
                            <TextDeprecated
                                title={
                                    starsCount ? t('Спасибо за оценку') : title
                                }
                            />
                        )}
                    />
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
                            <ToggleFeatures
                                name="isAppRedesigned"
                                on={(
                                    <HStack max gap="16" justify="end">
                                        <Button
                                            fullWidth
                                            onClick={onAcceptHandle}
                                        >
                                            {t('Отправить')}
                                        </Button>
                                    </HStack>
                                )}
                                off={(
                                    <HStack max gap="16" justify="end">
                                        <ButtonDeprecated
                                            fullWidth
                                            onClick={onAcceptHandle}
                                        >
                                            {t('Отправить')}
                                        </ButtonDeprecated>
                                    </HStack>
                                )}
                            />
                        </VStack>
                    </Drawer>
                ) : (
                    <Modal isOpen={isModalOpen} lazy>
                        <VStack gap="32" max>
                            {modalContent}

                            <ToggleFeatures
                                name="isAppRedesigned"
                                on={(
                                    <HStack max gap="16" justify="end">
                                        <Button
                                            onClick={onCancelHandle}
                                            variant="outline"
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
                                )}
                                off={(
                                    <HStack max gap="16" justify="end">
                                        <ButtonDeprecated
                                            onClick={onCancelHandle}
                                            theme={ThemeButton.RED}
                                            data-testid="RatingCard.Close"
                                        >
                                            {t('Закрыть')}
                                        </ButtonDeprecated>
                                        <ButtonDeprecated
                                            data-testid="RatingCard.Send"
                                            onClick={onAcceptHandle}
                                        >
                                            {t('Отправить')}
                                        </ButtonDeprecated>
                                    </HStack>
                                )}
                            />
                        </VStack>
                    </Modal>
                )}
            </>
        );

        return (
            <ToggleFeatures
                name="isAppRedesigned"
                on={(
                    <Card
                        border="round"
                        padding="24"
                        data-testid="RatingCard"
                        fullWidth
                        className={classNames('', {}, [className])}
                    >
                        {content}
                    </Card>
                )}
                off={(
                    <CardDeprecated
                        data-testid="RatingCard"
                        fullWidth
                        className={classNames('', {}, [className])}
                    >
                        {content}
                    </CardDeprecated>
                )}
            />
        );
    },
);
