import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/deprecated/Stack';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';
import {
    getAddCommentFormError,
    getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import cls from './AddCommentForm.module.scss';
import { Input } from '@/shared/ui/deprecated/Input';

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
                <HStack
                    data-testid="AddCommentForm"
                    max
                    justify="between"
                    className={classNames(cls.AddCommentForm, {}, [className])}
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
            </DynamicModuleLoader>
        );
    },
);

export default AddCommentForm;
