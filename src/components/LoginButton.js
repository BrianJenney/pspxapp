import React from 'react';
import { Button } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button
            style={{
                background: 'pink',
                borderColor: 'pink',
            }}
            size="large"
            onClick={() =>
                loginWithRedirect({ returnTo: window.location.origin })
            }
        >
            Log In or Create Account
        </Button>
    );
};

export default LogoutButton;
