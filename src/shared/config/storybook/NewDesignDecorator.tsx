import { Story } from '@storybook/react';
import { setFeatureFlag } from '@/shared/lib/features';
import { getFeatureAllFlags } from '@/shared/lib/features/lib/setGetFeatures';
// eslint-disable-next-line no-param-reassign

export const NewDesignDecorator = (StoryComponent: Story) => {
    setFeatureFlag({ ...getFeatureAllFlags(), isAppRedesigned: true });

    return (
        <div className="app_redesigned">
            <StoryComponent />
        </div>
    );
};
