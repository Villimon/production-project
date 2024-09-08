import { FeatureFlags } from '@/shared/types/featureFlags';

let featureFlags: FeatureFlags;

export function setFeatureFlag(newFeatureFlag?: FeatureFlags) {
    if (newFeatureFlag) {
        featureFlags = newFeatureFlag;
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featureFlags?.[flag];
}
