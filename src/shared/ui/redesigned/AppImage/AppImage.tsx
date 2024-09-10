import {
    FC,
    ImgHTMLAttributes,
    ReactElement,
    memo,
    useLayoutEffect,
    useState,
} from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string
    fallback?: ReactElement
    errorFallback?: ReactElement
}
export const AppImage: FC<AppImageProps> = memo(
    ({
        className,
        src,
        alt = 'image',
        errorFallback,
        fallback,
        ...otherProps
    }) => {
        const [isLoading, setIsLoading] = useState(true);
        const [hasError, setHasError] = useState(false);

        // Вызывается до того как компонент вмонтирваолся, подгрузка изображения произойдет еще до того как вмонтировался компонент
        useLayoutEffect(() => {
            const img = new Image();
            img.src = src ?? '';
            img.onload = () => {
                setIsLoading(false);
            };
            img.onerror = () => {
                setIsLoading(false);
                setHasError(true);
            };
        }, [src]);

        if (isLoading && fallback) {
            return fallback;
        }

        if (hasError && errorFallback) {
            return errorFallback;
        }

        return <img src={src} alt={alt} className={className} {...otherProps} />;
    },
);
