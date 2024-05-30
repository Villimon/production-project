import { Currency } from 'entitites/Currency';
import {
    FC, memo, useCallback, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
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

        const options = useMemo(() => [
            { value: Currency.RUB, content: Currency.RUB },
            { value: Currency.EUR, content: Currency.EUR },
            { value: Currency.USD, content: Currency.USD },
        ], []);

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Currency);
            },
            [onChange],
        );

        return (
            <Select
                className={classNames('', {}, [className])}
                label={t('Укажите валюту')}
                options={options}
                value={value}
                onChange={onChangeHandler}
                readonly={readonly}
            />
        );
    },
);
