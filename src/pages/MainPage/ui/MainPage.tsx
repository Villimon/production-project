import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line project-my-plugin/layer-imports
import { BugButton } from '@/app/providers/ErrorBoundary';
import { Counter } from '@/entitites/Counter';
import { Page } from '@/widgets/Page';
import { Input } from '@/shared/ui/deprecated/Input';

const MainPage = memo(() => {
    const { t } = useTranslation();

    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <Page data-testid="MainPage">
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
