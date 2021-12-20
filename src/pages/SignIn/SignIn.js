import React from 'react';
import LoginButton from '../../components/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import DesignerAvatar from '../../assets/designer-avatar.svg';
import { useNavigate } from 'react-router-dom';
import styles from './Signin.module.css';

const SignIn = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    if (isAuthenticated) {
        navigate('/configs');
    }
    return (
        <div
            style={{
                height: '100vh',
                padding: '0 3em',
            }}
        >
            <section className={styles.header}>
                <div>
                    <h2
                        style={{
                            fontSize: '3em',
                            fontWeight: '800',
                            lineHeight: 1,
                        }}
                    >
                        Deploy CSS changes in real time
                    </h2>
                    <h2 style={{ fontWeight: '200' }}>
                        Can you move that a few px to the right?
                    </h2>
                    <h2 style={{ fontWeight: '200' }}>
                        Instead of waiting for your development team's release
                        cycle, create the styles you want deployed, preview the
                        generated css and then release!
                    </h2>

                    <div style={{ marginTop: '2em' }}>
                        {isLoading ? <p>Loading...</p> : <LoginButton />}
                    </div>
                </div>

                <div className={styles.headerImg}>
                    <object type="image/svg+xml" data={DesignerAvatar}>
                        nitpicky designer
                    </object>
                </div>
            </section>

            <section style={{ marginTop: '3em' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2
                        style={{
                            fontSize: '2.5em',
                            fontWeight: '100',
                        }}
                    >
                        Get Started - No Coding Required
                    </h2>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                    }}
                >
                    <div className={styles.steps}>
                        <h2>1. Add our script to your website</h2>
                        <p>Sign up and get started for free</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.iconWidth}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            />
                        </svg>
                    </div>
                    <div className={styles.steps}>
                        <h2>2. Create a style config</h2>
                        <p>Target elements and screen sizes!</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.iconWidth}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>
                    <div className={styles.steps}>
                        <h2>3. Activate and deploy</h2>
                        <p>Preview the css and hit the activate switch!</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.iconWidth}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="pink"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                            />
                        </svg>
                    </div>
                </div>
            </section>

            <section
                style={{
                    marginTop: '3em',
                    paddingBottom: '5em',
                    textAlign: 'center',
                }}
            >
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5em', fontWeight: '100' }}>
                        Features
                    </h2>
                </div>

                <div className={styles.features}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.smallIcon}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    <h2 style={{ fontWeight: '100' }}>
                        <span className={styles.featureName}>
                            Real Time Deployments
                        </span>{' '}
                        - Experiment and iterate by deploying style changes
                        immediately to your sites
                    </h2>
                </div>

                <div className={styles.features}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.smallIcon}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    <h2 style={{ fontWeight: '100' }}>
                        <span className={styles.featureName}>
                            Version Control
                        </span>{' '}
                        - Rollback changes with the click of a button and access
                        old versions of your style configs
                    </h2>
                </div>
                <div className={styles.features}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.smallIcon}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    <h2 style={{ fontWeight: '100' }}>
                        <span className={styles.featureName}>
                            Preview Environment
                        </span>{' '}
                        - Check out your changes in a preview environment before
                        deploying live
                    </h2>
                </div>
                <div className={styles.features}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.smallIcon}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    <h2 style={{ fontWeight: '100' }}>
                        <span className={styles.featureName}>Generate CSS</span>{' '}
                        - Generate formatted CSS with the click of a button to
                        inspect the code
                    </h2>
                </div>
            </section>
        </div>
    );
};

export default SignIn;
