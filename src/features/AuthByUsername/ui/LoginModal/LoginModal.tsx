import { FC, memo, Suspense } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Loader } from '@/shared/ui/deprecated/Loader';

interface LoginModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
}
export const LoginModal: FC<LoginModalProps> = memo(
    ({ className, isOpen, onClose }) => (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className={classNames('', {}, [className])}
            lazy
        >
            <Suspense fallback={<Loader />}>
                <LoginFormAsync onSuccess={onClose} />
            </Suspense>
        </Modal>
    ),
);
