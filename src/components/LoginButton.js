import React from 'react';
import { Button } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button
            style={{
                backgroundColor: 'pink',
                color: '#ffff',
                fontSize: '1.5em',

                height: '50px',
            }}
            onClick={() =>
                loginWithRedirect({ returnTo: window.location.origin })
            }
        >
            Log In/Create Account
        </Button>
    );
};

export default LogoutButton;
