import { Listbox as HListbox } from '@headlessui/react';
import {
    Fragment, ReactNode, useMemo,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdawnDirection } from '@/shared/types/ui';
import { Button } from '../../../Button/Button';
import cls from './ListBox.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { HStack } from '@/shared/ui/redesigned/Stack';

export interface ListBoxItem<T extends string> {
    value: T
    content: ReactNode
    disabled?: boolean
}

interface ListBoxProps<T extends string> {
    className?: string
    items?: ListBoxItem<T>[]
    value?: T
    defaultValue?: string
    onChange: (value: T) => void
    readonly?: boolean
    direction?: DropdawnDirection
    label?: string
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
    const {
        className,
        items,
        onChange,
        defaultValue,
        value,
        readonly,
        direction = 'bottom-right',
        label,
    } = props;

    const selectedItem = useMemo(() => items?.find((item) => item.value === value), [items, value]);

    return (
        <HStack gap="4">
            {label && <span>{label}</span>}
            <HListbox
                disabled={readonly}
                as="div"
                value={value}
                className={classNames(cls.ListBox, {}, [
                    className,
                    popupCls.popup,
                ])}
                onChange={onChange}
            >
                <HListbox.Button
                    disabled={readonly}
                    className={popupCls.trigger}
                >
                    <Button variant="filled" disabled={readonly}>
                        {selectedItem?.content ?? defaultValue}
                    </Button>
                </HListbox.Button>

                <HListbox.Options
                    className={classNames(cls.options, {}, [
                        cls[direction],
                        popupCls.menu,
                    ])}
                >
                    {items?.map((item) => (
                        <HListbox.Option
                            as={Fragment}
                            key={item.value}
                            disabled={item.disabled}
                            value={item.value}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(cls.item, {
                                        [popupCls.active]: active,
                                        [popupCls.disabled]: item.disabled,
                                        [popupCls.selected]: selected,
                                    })}
                                >
                                    {selected}
                                    {item.content}
                                </li>
                            )}
                        </HListbox.Option>
                    ))}
                </HListbox.Options>
            </HListbox>
        </HStack>
    );
}
