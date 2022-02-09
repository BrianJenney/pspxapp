import React, { useContext, useState } from 'react';
import AccountInfo from './AccountInfo';
import { UserContext } from '../../contexts/UserContext';
import { apiClient } from '../../utils/apiClient';
import { Loader } from '../../components';

const AccountInfoContainer = () => {
    const [apiError, setApiError] = useState(null);
    const { user, setUser } = useContext(UserContext);

    const addOrRemoveUser = async ({
        method = 'add',
        email,
        spaceId,
        userid,
    }) => {
        setApiError(null);
        const urlPath =
            method === 'add' ? 'addusertospace' : 'removeuserfromspace';
        try {
            const data = await apiClient(`user/${urlPath}`, {
                email,
                spaceId,
                userid,
            });

            setUser((prev) => ({
                ...prev,
                spaceUsers:
                    method === 'add'
                        ? [...prev.spaceUsers, data?.data?.newUser]
                        : prev.spaceUsers.filter((u) => u.email !== email),
            }));
        } catch (e) {
            setApiError(
                'There was an error attempting to add that user. They may already exist in our system'
            );
        }
    };

    return (
        <div>
            {user ? (
                <AccountInfo
                    user={user}
                    addOrRemoveUser={addOrRemoveUser}
                    apiError={apiError}
                />
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default AccountInfoContainer;
