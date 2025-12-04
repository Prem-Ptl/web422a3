import { getToken } from '@/lib/authenticate';

export async function addToFavourites(id) {
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: "PUT",
        headers: {
            'Authorization': `JWT ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        return [];
    }
}

export async function removeFromFavourites(id) {
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `JWT ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        return [];
    }
}

export async function getFavourites() {
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
        method: "GET",
        headers: {
            'Authorization': `JWT ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        return [];
    }
}