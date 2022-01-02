import React, { useContext } from 'react';
import AccountInfo from './AccountInfo';
import { UserContext } from '../../contexts/UserContext';
import { apiClient } from '../../utils/apiClient';
import { Loader } from '../../components';

const AccountInfoContainer = () => {
    const { user, setUser } = useContext(UserContext);

    const addOrRemoveUser = async ({
        method = 'add',
        email,
        spaceId,
        userid,
    }) => {
        const urlPath =
            method === 'add' ? 'addusertospace' : 'removeuserfromspace';
        const data = await apiClient(`/styles/${urlPath}`, {
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
    };

    return (
        <div>
            {user ? (
                <AccountInfo user={user} addOrRemoveUser={addOrRemoveUser} />
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default AccountInfoContainer;
