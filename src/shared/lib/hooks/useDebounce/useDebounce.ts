import { MutableRefObject, useCallback, useRef } from 'react';

/**
 * Хук, который позволяет отменить предыдущий вызов функции, пока не истечет delay
 * @param callback
 * @param delay - задержка в мс
 * @returns
 */

export const useDebounce = (
    callback: (...args: any[]) => void,
    delay: number,
) => {
    const timer = useRef() as MutableRefObject<any>;

    return useCallback(
        (...args: any[]) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }

            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay],
    );
};
