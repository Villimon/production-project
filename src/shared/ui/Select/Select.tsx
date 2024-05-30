import {
    ChangeEvent, FC, memo, useMemo,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOptions {
    value: string;
    content: string;
}

interface SelectProps {
    className?: string;
    label?: string;
    options?: SelectOptions[];
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
}
export const Select: FC<SelectProps> = memo(
    ({
        className, label, options, onChange, value, readonly,
    }) => {
        const optionsList = useMemo(() => options?.map((i) => (
            <option className={cls.option} value={i.value} key={i.value}>
                {i.content}
            </option>
        )), [options]);

        const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
            onChange?.(e.target.value);
        };

        return (
            <div className={classNames(cls.Wrapper, {}, [className])}>
                {label && <span className={cls.label}>{`${label}>`}</span>}
                <select
                    value={value}
                    onChange={onChangeHandler}
                    className={cls.select}
                    disabled={readonly}
                >
                    {optionsList}
                </select>
            </div>
        );
    },
);
