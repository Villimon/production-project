import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/constants/localstorage';
import { FeatureFlags } from '@/shared/types/featureFlags';

const defaultFeatures: FeatureFlags = {
    isAppRedesigned:
        localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new',
};

let featureFlags: FeatureFlags = {
    ...defaultFeatures,
};

export function setFeatureFlag(newFeatureFlag?: FeatureFlags) {
    if (newFeatureFlag) {
        featureFlags = newFeatureFlag;
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featureFlags?.[flag];
}

export function getFeatureFlags() {
    return featureFlags;
}
