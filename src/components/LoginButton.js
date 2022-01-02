import React from 'react';
import { Button } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './LoginButton.module.css';

const LogoutButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <>
            <Button
                size="large"
                type="primary"
                onClick={() =>
                    loginWithRedirect({ returnTo: window.location.origin })
                }
            >
                Create a FREE Account
            </Button>
            <p>
                Existing User?{' '}
                <span
                    onClick={() =>
                        loginWithRedirect({ returnTo: window.location.origin })
                    }
                    className={styles.fakeLink}
                >
                    Sign In
                </span>
            </p>
        </>
    );
};

export default LogoutButton;
