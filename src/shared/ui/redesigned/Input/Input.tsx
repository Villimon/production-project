import React, {
    FC,
    InputHTMLAttributes,
    ReactNode,
    memo,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Trans } from 'react-i18next';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import { HStack } from '../Stack';
import { Text } from '../Text';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly'
>

interface InputProps extends HTMLInputProps {
    className?: string
    label?: string
    value?: string | number
    onChange?: (value: string) => void
    type?: string
    placeholder?: string
    autofocus?: boolean
    readonly?: boolean
    addonLeft?: ReactNode
    addonRight?: ReactNode
}

export const Input: FC<InputProps> = memo(
    ({
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        readonly,
        addonLeft,
        addonRight,
        label,
        ...otherProps
    }) => {
        const [isFocused, setIsFocused] = useState(false);
        const ref = useRef<HTMLInputElement>(null);
        useEffect(() => {
            if (autofocus) {
                setIsFocused(true);
                ref.current?.focus();
            }
        }, [autofocus]);

        const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value);
        };

        const onBlur = () => {
            setIsFocused(false);
        };
        const onFocus = () => {
            setIsFocused(true);
        };

        const mods: Mods = {
            [cls.readonly]: readonly,
            [cls.focused]: isFocused,
            [cls.withAddonLeft]: Boolean(addonLeft),
            [cls.withAddonRight]: Boolean(addonRight),
        };

        return (
            <HStack gap="8" max>
                {label && <Text text={label} />}
                <div
                    className={classNames(cls.InputWrapper, mods, [className])}
                >
                    {addonLeft && (
                        <div className={cls.addonLeft}>{addonLeft}</div>
                    )}
                    <Trans _translateProps={['placeholder']}>
                        <input
                            id="input"
                            ref={ref}
                            className={cls.input}
                            placeholder={placeholder}
                            type={type}
                            value={value}
                            onChange={onChangeHandler}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            readOnly={readonly}
                            {...otherProps}
                        />
                    </Trans>
                    {addonRight && (
                        <div className={cls.addonRight}>{addonRight}</div>
                    )}
                </div>
            </HStack>
        );
    },
);
