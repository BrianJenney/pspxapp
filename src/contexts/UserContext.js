import React, { createContext, useEffect, useState } from 'react';
import { apiClient } from '../utils/apiClient';
import { useAuth0 } from '@auth0/auth0-react';

export const UserContext = createContext({
    user: null,
    setUser: () => {},
    isLoading: true,
});

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user: auth0User } = useAuth0();

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            const userid = auth0User?.sub.split('|')[1];
            try {
                const data = await apiClient(
                    `styles/getUser?userid=${userid}`,
                    {},
                    { method: 'GET' }
                );
                setUser({
                    ...data?.data?.space,
                    ...data?.data?.user,
                    spaceUsers: [...data?.data?.spaceUsers],
                    spaceKey: data?.data?.space?.spaceId,
                });
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
                throw e;
            }
        };
        if (auth0User?.sub) fetchUser();
    }, [auth0User?.sub]);

    return (
        <UserContext.Provider
            value={{
                user,
                isLoading,
                setUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
