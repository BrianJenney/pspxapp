import React, { useContext } from 'react';
import AccountInfo from './AccountInfo';
import { UserContext } from '../../contexts/UserContext';

const AccountInfoContainer = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <AccountInfo user={user} />
            <a href="https://buy.stripe.com/dR6cQoe55aZ89cAcMN">
                <p>Upgrade your account</p>
            </a>
        </div>
    );
};

export default AccountInfoContainer;
