import { ArticleList, ArticleView } from 'entitites/Article';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const ArticlesPage = memo(() => {
    const { t } = useTranslation();

    return (
        <div>
            <ArticleList view={ArticleView.BIG} articles={[]} />
        </div>
    );
});

export default ArticlesPage;
