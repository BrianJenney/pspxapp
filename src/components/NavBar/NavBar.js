import React from 'react';
import { CodeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <>
            <header className={styles.header}>
                <div
                    onClick={() => navigate('/')}
                    className={styles.iconWrapper}
                >
                    <p className={styles.link}>PSPX</p>
                    <CodeTwoTone twoToneColor="#eb2f96" />
                </div>
                <div className={styles.linkWrapper}>
                    <p
                        onClick={() => navigate('/account')}
                        className={styles.link}
                    >
                        Account
                    </p>
                    <p
                        onClick={() => navigate('/configs')}
                        className={styles.link}
                    >
                        Style Configurator
                    </p>
                    <p
                        onClick={() => navigate('/docs')}
                        className={styles.link}
                    >
                        Docs
                    </p>
                </div>
            </header>
        </>
    );
};

export default NavBar;
