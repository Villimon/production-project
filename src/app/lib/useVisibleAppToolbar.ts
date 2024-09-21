import { useEffect, useState } from 'react';

export function useVisibleAppToolbar() {
    const [coordinates, setCoordinates] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setCoordinates(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return window.innerHeight < coordinates;
}
