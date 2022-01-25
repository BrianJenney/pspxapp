import React from 'react';
import { Card, Button } from 'antd';
import styles from './SubscriptionCard.module.css';

const SubscriptionCard = ({ price, title, features, basis, clickHandler }) => {
    return (
        <Card style={{ width: 300 }}>
            <div className={styles.cardContainer}>
                <h1>{title.toUpperCase()}</h1>
                <p>
                    {!price
                        ? 'FREE'
                        : `$${price} per ${basis} (Cancel Anytime)`}
                </p>
                <hr />
                {features.map((feature) => (
                    <div className={styles.feature}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.checkIcon}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <p>{feature}</p>
                    </div>
                ))}
                {price ? (
                    <Button type="primary" onClick={clickHandler}>
                        Upgrade your account
                    </Button>
                ) : (
                    <></>
                )}
            </div>
        </Card>
    );
};

export default SubscriptionCard;
