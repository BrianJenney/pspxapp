import React, { useContext } from 'react';
import AccountInfo from './AccountInfo';
import { UserContext } from '../../contexts/UserContext';

const AccountInfoContainer = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <AccountInfo user={user} />
        </div>
    );
};

export default AccountInfoContainer;
