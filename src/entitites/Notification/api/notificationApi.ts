import { rtkApi } from '@/shared/api/rtkApi';
import { Notification } from '../model/types/NotificationSchema';

// Если страница подгружается асинхронно, то тогда это не попадает в общий бандл
const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<Notification[], null>({
            query: () => ({
                url: '/notifications',
            }),
        }),
    }),
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
