import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const ArticlesPage = memo(() => {
    const { t } = useTranslation();

    return <div>{t('Войти')}</div>;
});

export default ArticlesPage;
