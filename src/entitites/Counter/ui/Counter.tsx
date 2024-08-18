import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

interface CounterProps {}
export const Counter: FC<CounterProps> = (props) => {
    const { t } = useTranslation();
    const counterValue = useCounterValue();
    const { add, decrement, increment } = useCounterActions();

    const handleIncrement = () => {
        increment();
    };
    const handleDecrement = () => {
        decrement();
    };
    const handleAdd = () => {
        add(5);
    };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button data-testid="add-btn" onClick={handleAdd}>
                {t('increment')}
            </Button>
            <Button data-testid="increment-btn" onClick={handleIncrement}>
                {t('increment')}
            </Button>
            <Button data-testid="decrement-btn" onClick={handleDecrement}>
                {t('decrement')}
            </Button>
        </div>
    );
};
