'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
    name: string;
    email?: string;
}

interface UserContextType {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
    isLoading: boolean;
    fetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUserState] = useState<UserData | null>(() => {
        // Initialize from localStorage
        if (typeof window !== 'undefined') {
            const cachedUser = localStorage.getItem('mindease_user');
            if (cachedUser) {
                try {
                    return JSON.parse(cachedUser);
                } catch {
                    return null;
                }
            }
        }
        return null;
    });    const setUser = (userData: UserData | null) => {
        setUserState(userData);
        if (userData) {
            localStorage.setItem('mindease_user', JSON.stringify(userData));
        } else {
            localStorage.removeItem('mindease_user');
        }
    };

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/user/profile');
            if (res.ok) {
                const data = await res.json();
                if (data.user) {
                    setUser({
                        name: data.user.name,
                        email: data.user.email
                    });
                }
            }
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };    return (
        <UserContext.Provider value={{ user, setUser, isLoading: false, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
