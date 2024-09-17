import { ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';
import { toggleFeatures } from '@/shared/lib/features';

interface ModalProps {
    className?: string
    isOpen: boolean
    onClose?: () => void
    lazy?: boolean
    children: ReactNode
}

export const Modal = ({
    className,
    children,
    isOpen,
    onClose,
    lazy,
}: ModalProps) => {
    const { closeHandler, isClosing, isMounted } = useModal({
        animationDelay: 300,
        isOpen,
        onClose,
    });

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div
                className={classNames(
                    cls.Modal,
                    { [cls.opened]: isOpen, [cls.isClosing]: isClosing },
                    [
                        className,
                        toggleFeatures({
                            name: 'isAppRedesigned',
                            on: () => cls.modalNew,
                            off: () => cls.modalOld,
                        }),
                    ],
                )}
            >
                <Overlay onClick={closeHandler} />
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    );
};
