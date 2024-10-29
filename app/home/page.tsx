"use client";

import React, { useEffect, useState } from 'react';

const HomePage = () => {
    const [user, setUser] = useState<string | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean | null>(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const csrfToken = localStorage.getItem('csrfToken');
                const response = await fetch('/api/home', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'X-CSRF-Token': csrfToken || '',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.username);
                    setAuthenticated(true)
                } else {
                    window.location.href = '/';
                }
            } catch (error) {
                console.error('Failed to check session:', error);
                window.location.href = '/';
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!authenticated) {
        return null;
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold">Welcome {user}</h1>
        </div>
    );
};

export default HomePage;
