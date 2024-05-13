import { useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';

// Тестовый компонент, для отлавливание ошибки
export const BugButton = () => {
    const [error, setError] = useState(false);
    const { t } = useTranslation();

    const onThrow = () => setError(true);

    useEffect(() => {
        if (error) {
            throw new Error('wewqe');
        }
    }, [error]);

    return (
        <Button onClick={onThrow} className={classNames('', {}, [])}>
            {t('Выбросить ошибку')}
        </Button>
    );
};
