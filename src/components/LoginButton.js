import React from 'react';
import { Button } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button
            size="large"
            type="primary"
            onClick={() =>
                loginWithRedirect({ returnTo: window.location.origin })
            }
        >
            Create a FREE Account
        </Button>
    );
};

export default LogoutButton;
