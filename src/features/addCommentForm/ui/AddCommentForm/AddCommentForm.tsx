import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';
import {
    getAddCommentFormError,
    getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import cls from './AddCommentForm.module.scss';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

export interface AddCommentFormProps {
    className?: string
    onSendComment: (text: string) => void
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm: FC<AddCommentFormProps> = memo(
    ({ className, onSendComment }) => {
        const { t } = useTranslation();
        const text = useSelector(getAddCommentFormText);
        const error = useSelector(getAddCommentFormError);
        const dispatch = useAppDispatch();

        const onCommentTextChange = useCallback(
            (value: string) => {
                dispatch(addCommentFormActions.setText(value));
            },
            [dispatch],
        );

        const onSendHandler = useCallback(() => {
            onSendComment(text || '');
            onCommentTextChange('');
        }, [text, onSendComment, onCommentTextChange]);

        return (
            <DynamicModuleLoader reducers={reducers}>
                <ToggleFeatures
                    name="isAppRedesigned"
                    on={(
                        <Card padding="16" fullWidth border="round">
                            <HStack
                                data-testid="AddCommentForm"
                                max
                                gap="8"
                                justify="between"
                                className={classNames(
                                    cls.AddCommentFormRedesigned,
                                    {},
                                    [className],
                                )}
                            >
                                <Input
                                    className={cls.input}
                                    data-testid="AddCommentForm.Input"
                                    placeholder={t('Введите текст комментария')}
                                    value={text}
                                    onChange={onCommentTextChange}
                                />
                                <Button
                                    data-testid="AddCommentForm.Button"
                                    onClick={onSendHandler}
                                >
                                    {t('Отправить')}
                                </Button>
                            </HStack>
                        </Card>
                    )}
                    off={(
                        <HStack
                            data-testid="AddCommentForm"
                            max
                            justify="between"
                            className={classNames(cls.AddCommentForm, {}, [
                                className,
                            ])}
                        >
                            <InputDeprecated
                                className={cls.input}
                                data-testid="AddCommentForm.Input"
                                placeholder={t('Введите текст комментария')}
                                value={text}
                                onChange={onCommentTextChange}
                            />
                            <ButtonDeprecated
                                data-testid="AddCommentForm.Button"
                                onClick={onSendHandler}
                            >
                                {t('Отправить')}
                            </ButtonDeprecated>
                        </HStack>
                    )}
                />
            </DynamicModuleLoader>
        );
    },
);

export default AddCommentForm;
