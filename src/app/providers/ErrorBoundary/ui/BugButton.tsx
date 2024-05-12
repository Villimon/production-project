import { useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';

// Тестовый компонент, для отлавливание ошибки
export const BugButton = () => {
    const [error, setError] = useState(false);

    const onThrow = () => setError(true);

    useEffect(() => {
        if (error) {
            throw new Error('wewqe');
        }
    }, [error]);

    return (
        <Button onClick={onThrow} className={classNames('', {}, [])}>
            throw error
        </Button>
    );
};
