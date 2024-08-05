import { Profile } from '@/entitites/Profile';
import { ValidateProfileErrors } from '../consts/consts';

export interface ProfileSchema {
    data?: Profile
    form?: Profile
    isLoading: boolean
    error?: string
    readonly: boolean
    validateError?: ValidateProfileErrors[]
}
