import React from 'react';
import { Button } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './LoginButton.module.css';

const LogoutButton = ({ showLogin = true }) => {
    const { loginWithRedirect } = useAuth0();

    return (
        <>
            <Button
                size="large"
                type="primary"
                style={{ height: 'auto', lineHeight: 1 }}
                onClick={() =>
                    loginWithRedirect({ returnTo: window.location.origin })
                }
            >
                Create a FREE Account <br />{' '}
                <small className={styles.buttonDisclaimer}>in 10 seconds</small>
            </Button>
            {showLogin && (
                <p>
                    Existing User?{' '}
                    <span
                        onClick={() =>
                            loginWithRedirect({
                                returnTo: window.location.origin,
                            })
                        }
                        className={styles.fakeLink}
                    >
                        Sign In
                    </span>
                </p>
            )}
        </>
    );
};

export default LogoutButton;
