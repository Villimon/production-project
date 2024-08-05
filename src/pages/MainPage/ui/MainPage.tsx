import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line project-my-plugin/layer-imports
import { BugButton } from '@/app/providers/ErrorBoundary';
import { Counter } from '@/entitites/Counter';
import { Input } from '@/shared/ui/Input/Input';
import { Page } from '@/widgets/Page';

const MainPage = memo(() => {
    const { t } = useTranslation();

    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <Page>
            <BugButton />
            {t('Главная страница')}
            <Counter />

            <Input
                autofocus
                value={value}
                onChange={onChange}
                placeholder={t('Войти')}
            />
        </Page>
    );
});

export default MainPage;
