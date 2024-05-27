import axios from 'axios';
import { USER_LOCAL_STORAGE_KEY } from 'shared/constants/localstorage';

// const baseUrl = __IS_DEV__ ? 'http://localhost:8000' : 'siteurl.ru';

export const $api = axios.create({
    // baseURL: baseUrl,
    baseURL: __API__,
    headers: {
        authorization: localStorage.getItem(USER_LOCAL_STORAGE_KEY),
    },
});
