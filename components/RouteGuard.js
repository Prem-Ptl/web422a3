import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { isAuthenticated } from '@/lib/authenticate';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';
import { getFavourites } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/register', '/about'];

export default function RouteGuard(props) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [, setFavouritesList] = useAtom(favouritesAtom);
    const [, setSearchHistory] = useAtom(searchHistoryAtom);

    async function updateAtoms() {
        try {
            const favourites = await getFavourites();
            setFavouritesList(favourites);
        } catch (error) {
            // Handle error silently
        }
    }

    useEffect(() => {
        updateAtoms();
        
        const authCheck = () => {
            const path = router.pathname.split('?')[0];
            if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
                setAuthorized(false);
                router.push('/login');
            } else {
                setAuthorized(true);
            }
        };

        authCheck();
        router.events.on('routeChangeComplete', authCheck);

        return () => {
            router.events.off('routeChangeComplete', authCheck);
        };
    }, [router]);

    return <>{authorized && props.children}</>;
}