import { BugButton } from 'app/providers/ErrorBoundary';
import { Counter } from 'entitites/Counter';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';

const MainPage = memo(() => {
    const { t } = useTranslation();

    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <div>
            <BugButton />
            {t('Главная страница')}
            <Counter />

            <Input
                autofocus
                value={value}
                onChange={onChange}
                placeholder={t('Войти')}
            />
        </div>
    );
});

export default MainPage;
