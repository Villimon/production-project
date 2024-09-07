import { ReactElement } from 'react';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { getFeatureFlag } from '../setGetFeatures';

interface ToggleFeaturesOptions {
    name: keyof FeatureFlags
    on: ReactElement
    off: ReactElement
}

export const ToggleFeatures = ({ name, off, on }: ToggleFeaturesOptions) => {
    if (getFeatureFlag(name)) {
        return on;
    }

    return off;
};
