export { saveJsonSettings } from './model/services/saveJsonSettings';
export { useJsonSettings } from './model/selectors/jsonSettings';
export { UserRole } from './model/consts/consts';
export {
    isUserManager,
    isUserAdmin,
    getUserRole,
} from './model/selectors/roleSelectors';
export { getUserInited } from './model/selectors/getUserInited/getUserInited';
export { getUserData } from './model/selectors/getUserData/getUserData';
export { userActions, userReducer } from './model/slice/userSlice';
export type { UserSchema, User } from './model/types/user';
