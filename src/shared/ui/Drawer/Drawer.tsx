import {
    FC, memo, ReactNode, useCallback, useEffect,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAnimationLibs } from '@/shared/lib/components/AnimationProvider';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Drawer.module.scss';

// До - 434
// После - 495
interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const height = window.innerHeight - 100;

export const DrawerContent: FC<DrawerProps> = memo(
    ({
        className, children, isOpen, onClose, lazy,
    }) => {
        const { Gesture, Spring } = useAnimationLibs();

        const [{ y }, api] = Spring.useSpring(() => ({ y: height }));

        const openDrawer = useCallback(() => {
            api.start({ y: 0, immediate: false });
        }, [api]);

        useEffect(() => {
            if (isOpen) {
                openDrawer();
            }
        }, [api, isOpen, openDrawer]);

        const close = (velocity = 0) => {
            api.start({
                y: height,
                immediate: false,
                config: { ...Spring.config.stiff, velocity },
                onResolve: onClose,
            });
        };

        const bind = Gesture.useDrag(
            ({
                last,
                velocity: [, vy],
                direction: [, dy],
                movement: [, my],
                cancel,
            }) => {
                if (my < -70) cancel();

                if (last) {
                    if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
                        close();
                    } else {
                        openDrawer();
                    }
                }
                api.start({ y: my, immediate: true });
            },
            {
                from: () => [0, y.get()],
                filterTaps: true,
                bounds: { top: 0 },
                rubberband: true,
            },
        );

        if (!isOpen) {
            return null;
        }
        const display = y.to((py) => (py < height ? 'block' : 'none'));

        return (
            <Portal>
                <div className={classNames(cls.Drawer, {}, [className])}>
                    <Overlay onClick={onClose} />
                    <Spring.a.div
                        className={cls.sheet}
                        style={{
                            display,
                            bottom: `calc(-100vh + ${height - 100}px)`,
                            y,
                        }}
                        {...bind()}
                    >
                        {children}
                    </Spring.a.div>
                </div>
            </Portal>
        );
    },
);

export const Drawer = memo((props: DrawerProps) => {
    const { isLoaded } = useAnimationLibs();

    if (!isLoaded) {
        return null;
    }

    return <DrawerContent {...props} />;
});