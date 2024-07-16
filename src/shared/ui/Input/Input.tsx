import React, {
    FC,
    InputHTMLAttributes,
    memo,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Trans } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    type?: string;
    placeholder: string;
    autofocus?: boolean;
    readonly?: boolean;
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

        return (
            <div
                className={classNames(
                    cls.InputWrapper,
                    { [cls.readonly]: readonly },
                    [className],
                )}
            >
                <Trans _translateProps={['placeholder']}>
                    <input
                        id="input"
                        ref={ref}
                        className={cls.input}
                        placeholder={!isFocused ? placeholder : ' '}
                        type={type}
                        value={value}
                        onChange={onChangeHandler}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        readOnly={readonly}
                        {...otherProps}
                    />
                </Trans>
                <label htmlFor="input" className={cls.label}>
                    {placeholder}
                </label>
            </div>
        );
    },
);
