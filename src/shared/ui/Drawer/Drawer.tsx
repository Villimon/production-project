import { useTheme } from 'app/providers/ThemeProvider';
import { FC, memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Drawer.module.scss';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}
export const Drawer: FC<DrawerProps> = memo(
    ({
        className, children, isOpen, onClose, lazy,
    }) => {
        const { closeHandler, isClosing, isMounted } = useModal({
            animationDelay: 300,
            isOpen,
            onClose,
        });

        if (lazy && !isMounted) {
            return null;
        }

        return (
            <Portal>
                <div
                    className={classNames(
                        cls.Drawer,
                        { [cls.opened]: isOpen, [cls.isClosing]: isClosing },
                        [className],
                    )}
                >
                    <Overlay onClick={closeHandler} />
                    <div className={cls.content}>{children}</div>
                </div>
            </Portal>
        );
    },
);
