import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { Country } from '../model/types/country';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface CountrySelectProps {
    className?: string
    value?: Country
    readonly?: boolean
    onChange?: (value: Country) => void
}

const options = [
    { value: Country.America, content: Country.America },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Ukraine, content: Country.Ukraine },
];

export const CountrySelect: FC<CountrySelectProps> = memo(
    ({
        className, onChange, value, readonly,
    }) => {
        const { t } = useTranslation();

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Country);
            },
            [onChange],
        );

        const props = {
            className,
            items: options,
            value,
            onChange: onChangeHandler,
            defaultValue: t('Укажите страну'),
            label: t('Укажите страну'),
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
