import { Listbox as HListbox } from '@headlessui/react';
import { Fragment, memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from '../Button/Button';
import { HStack } from '../Stack';
import cls from './ListBox.module.scss';

type DropdawnDirection = 'top' | 'bottom';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    className?: string;
    items?: ListBoxItem[];
    value?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    readonly?: boolean;
    direction?: DropdawnDirection;
    label?: string;
}
export const ListBox = memo((props: ListBoxProps) => {
    const {
        className,
        items,
        onChange,
        defaultValue,
        value,
        readonly,
        direction = 'bottom',
        label,
    } = props;

    return (
        <HStack gap="4">
            {label && <span>{label}</span>}
            <div className={classNames(cls.ListBox, {}, [className])}>
                <HListbox
                    disabled={readonly}
                    as="div"
                    value={value}
                    onChange={onChange}
                >
                    <HListbox.Button
                        disabled={readonly}
                        className={cls.trigger}
                    >
                        <Button disabled={readonly}>
                            {value ?? defaultValue}
                        </Button>
                    </HListbox.Button>

                    <HListbox.Options
                        className={classNames(cls.options, {}, [
                            cls[direction],
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
                                            [cls.active]: active,
                                            [cls.disabled]: item.disabled,
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
            </div>
        </HStack>
    );
});
