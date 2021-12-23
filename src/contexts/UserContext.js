import React, { createContext, useEffect, useState } from 'react';
import { apiClient } from '../utils/apiClient';
import { useAuth0 } from '@auth0/auth0-react';

export const UserContext = createContext({
    user: null,
    setUser: () => {},
});

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { user: auth0User } = useAuth0();

    useEffect(() => {
        const fetchUser = async () => {
            const userid = auth0User?.sub.split('|')[1];
            try {
                const data = await apiClient(
                    `styles/getUser?userid=${userid}`,
                    {},
                    { method: 'GET' }
                );
                setUser({ ...data?.data?.user, ...data?.data?.space });
            } catch (e) {
                console.log(e);
            }
        };
        if (auth0User?.sub) fetchUser();
    }, [auth0User?.sub]);

    return (
        <UserContext.Provider
            value={{
                user,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
