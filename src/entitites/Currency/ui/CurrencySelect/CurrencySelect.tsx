import {
    FC, memo, useCallback, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Currency } from '@/entitites/Currency/model/types/currency';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox } from '@/shared/ui/Popups';
import cls from './CurrencySelect.module.scss';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    readonly?: boolean;
    onChange?: (value: any) => void;
}

export const CurrencySelect: FC<CurrencySelectProps> = memo(
    ({
        className, onChange, value, readonly,
    }) => {
        const { t } = useTranslation();

        const options = useMemo(
            () => [
                { value: Currency.RUB, content: Currency.RUB },
                { value: Currency.EUR, content: Currency.EUR },
                { value: Currency.USD, content: Currency.USD },
            ],
            [],
        );

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Currency);
            },
            [onChange],
        );

        return (
            <ListBox
                className={classNames('', {}, [className])}
                items={options}
                value={value}
                onChange={onChangeHandler}
                defaultValue={t('Укажите валюту')}
                label={t('Укажите валюту')}
                readonly={readonly}
                direction="top-right"
            />
        );
    },
);
