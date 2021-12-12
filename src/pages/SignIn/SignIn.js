import React from 'react';
import LoginButton from '../../components/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import DesignerAvatar from '../../assets/designer-avatar.svg';

const SignIn = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <div
            style={{
                backgroundColor: '#262626',
                height: '100vh',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    padding: '3em',
                }}
            >
                <section>
                    <h1 style={{ color: 'pink', fontSize: '3em' }}>PSPX</h1>
                    <p style={{ color: '#ffff', fontSize: '2em' }}>
                        Can you move that just a few px over?
                    </p>
                </section>
                <section
                    style={{
                        margin: 'auto',
                        display: 'flex',
                    }}
                >
                    {isLoading ? <p>Loading...</p> : <LoginButton />}
                </section>
            </div>
            <section>
                <object
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        maxWidth: '400px',
                    }}
                    type="image/svg+xml"
                    data={DesignerAvatar}
                >
                    nitpicky designer
                </object>
            </section>
        </div>
    );
};

export default SignIn;
