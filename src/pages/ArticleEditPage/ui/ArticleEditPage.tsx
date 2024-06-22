import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Page } from 'widgets/Page';

const ArticleEditPage = memo(() => {
    const { t } = useTranslation('article');
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);

    return (
        <Page>
            {isEdit ? t('Редактирование статьи') : t('Создание новой статьи')}
        </Page>
    );
});

export default ArticleEditPage;
