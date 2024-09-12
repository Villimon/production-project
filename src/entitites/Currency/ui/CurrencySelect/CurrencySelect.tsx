import {
    FC, memo, useCallback, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { Currency } from '../../model/types/currency';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface CurrencySelectProps {
    className?: string
    value?: Currency
    readonly?: boolean
    onChange?: (value: any) => void
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

        const props = {
            className,
            items: options,
            value,
            onChange: onChangeHandler,
            defaultValue: t('Укажите валюту'),
            label: t('Укажите валюту'),
            readonly,
            direction: 'top-right',
        } as const;

        return (
            <ToggleFeatures
                name="isAppRedesigned"
                on={<ListBox {...props} />}
                off={<ListBoxDeprecated {...props} />}
            />
        );
    },
);
