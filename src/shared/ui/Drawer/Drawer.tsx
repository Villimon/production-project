import { useTheme } from 'app/providers/ThemeProvider';
import { FC, memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Drawer.module.scss';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}
export const Drawer: FC<DrawerProps> = memo(
    ({ className, children, isOpen, onClose }) => (
        <Portal>
            <div
                className={classNames(cls.Drawer, { [cls.opened]: isOpen }, [
                    className,
                ])}
            >
                <Overlay onClick={onClose} />
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    )
);
