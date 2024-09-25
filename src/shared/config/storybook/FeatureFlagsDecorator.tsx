import { Story } from '@storybook/react';
import { setFeatureFlag } from '@/shared/lib/features';
import { FeatureFlags } from '@/shared/types/featureFlags';

export const FeatureFlagsDecorator = (features: FeatureFlags) => (StoryComponent: Story) => {
    setFeatureFlag(features);

    return <StoryComponent />;
};
