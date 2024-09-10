import { Listbox as HListbox } from '@headlessui/react';
import { Fragment, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdawnDirection } from '@/shared/types/ui';
import { Button } from '../../../Button/Button';
import cls from './ListBox.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { HStack } from '@/shared/ui/redesigned/Stack';

export interface ListBoxItem {
    value: string
    content: ReactNode
    disabled?: boolean
}

interface ListBoxProps {
    className?: string
    items?: ListBoxItem[]
    value?: string
    defaultValue?: string
    onChange: (value: string) => void
    readonly?: boolean
    direction?: DropdawnDirection
    label?: string
}

export const ListBox = memo((props: ListBoxProps) => {
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
                    <Button disabled={readonly}>{value ?? defaultValue}</Button>
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
                                    })}
                                >
                                    {selected && '!'}
                                    {item.content}
                                </li>
                            )}
                        </HListbox.Option>
                    ))}
                </HListbox.Options>
            </HListbox>
        </HStack>
    );
});
