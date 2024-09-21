import {
    ReactNode, createContext, useContext, useMemo, useState,
} from 'react';

// Костыль, так лучше не делать
const ForceUpdateContext = createContext({
    value: true,
    forceUpdate: () => {},
});

export const useForceUpdate = () => {
    const { forceUpdate } = useContext(ForceUpdateContext);

    return forceUpdate;
};

// Уничтожаем интерфейс на доли секунды, чтобы чилдрен снова отрисовался и все нереакттивные значения с фичами обновленные отрисовываются
export function ForceUpdateProvider({ children }: { children: ReactNode }) {
    const [value, setValue] = useState(true);

    const forceUpdate = () => {
        setValue((prev) => !prev);
        setTimeout(() => {
            setValue((prev) => !prev);
        }, 0);
    };

    const valueContext = useMemo(() => ({ value, forceUpdate }), [value]);

    if (!value) {
        return null;
    }

    return (
        <ForceUpdateContext.Provider value={valueContext}>
            {children}
        </ForceUpdateContext.Provider>
    );
}
