import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode
    element?: HTMLElement
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
// Комопнент который похволяет переносить какой-то кусок дом дерева в другое место,
// которое указано как element
export const Portal = (props: PortalProps) => {
    const { children, element = document.body } = props;

    return createPortal(children, element);
};
