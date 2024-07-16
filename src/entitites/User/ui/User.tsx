import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './User.module.scss';

interface UserProps {
    className?: string;
}
export const User: FC<UserProps> = memo(({ className }) => (
    <article className={classNames(cls.User, {}, [className])} />
));
