import React, { useState } from 'react';
import { Input, Button, Space, Form, Tag, Modal, Alert } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { apiClient } from '../../utils/apiClient';
import styles from './AccountInfo.module.css';
import { SubscriptionCard } from '../../components';

const AccountInfo = ({ user, addOrRemoveUser, apiError }) => {
    const [isHidden, setIsHidden] = useState(false);

    const subscriptions = [
        {
            title: 'Basic',
            price: 0,
            basis: 'FOREVER',
            features: [
                '1 rules',
                '5 style per rule',
                '1 user',
                'Engineering Support (Limited)',
            ],
        },
        {
            title: 'Pro',
            price: 100,
            basis: 'month',
            features: [
                '10 rules',
                '15 styles per rule',
                '10 users',
                '24/7 Engineering Support',
            ],
        },
    ];

    const onFinish = (values) => {
        addOrRemoveUser({
            method: 'add',
            email: values.useremail,
            spaceId: user?.spaceId,
        });
    };

    const showDeleteConfirm = (email, userid) => {
        confirm({
            title: `Are you sure you want to remove ${email}?`,
            icon: <ExclamationCircleOutlined />,

            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                addOrRemoveUser({
                    method: 'remove',
                    email,
                    userid,
                    spaceId: user?.spaceId,
                });
            },
            onCancel() {
                return;
            },
        });
    };

    // request a checkout link from stripe with the subscription id
    const getCheckoutLink = async () => {
        const sessionData = await apiClient('/payments/startcheckout', {
            priceId:
                process.env.REACT_APP_ENV === 'production'
                    ? 'price_1K9sWAJRPNNdaytqzYdyr9Jm'
                    : 'price_1KAPulJRPNNdaytq61FIfuRQ',
            spaceId: user?.spaceKey,
            userId: user?._id,
        });

        if (sessionData?.data?.sessionUrl) {
            window.location.href = sessionData.data.sessionUrl;
        }
    };

    const { confirm } = Modal;

    return (
        <div>
            <div className={styles.accountInfoContainer}>
                <Space>
                    <Input
                        type={isHidden ? 'password' : 'text'}
                        disabled
                        value={user?.spaceKey}
                    />
                    <Button
                        onClick={() => setIsHidden(!isHidden)}
                        title={isHidden ? 'Reveal API Key' : 'Hide API Key'}
                    >
                        {isHidden ? 'Reveal API Key' : 'Hide API Key'}
                    </Button>
                </Space>
                <div>
                    {!user?.hasSubscription && (
                        <div className={styles.subscriptions}>
                            {subscriptions.map((sub) => (
                                <SubscriptionCard
                                    {...sub}
                                    clickHandler={getCheckoutLink}
                                />
                            ))}
                        </div>
                    )}

                    {user?.hasSubscription && user?.isAdmin && (
                        <div>
                            <h2>Invite Users</h2>
                            {(user?.spaceUsers || [])
                                .filter((u) => u._id !== user._id)
                                .map((u) => (
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Space>
                                            <p>{u?.email}</p>

                                            <svg
                                                onClick={() =>
                                                    showDeleteConfirm(
                                                        u.email,
                                                        u._id
                                                    )
                                                }
                                                width="20px"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={styles.deleteIcon}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>

                                            <div style={{ margin: '1em 0' }}>
                                                {!u.userid && (
                                                    <Tag color="red">
                                                        Pending
                                                    </Tag>
                                                )}
                                            </div>
                                        </Space>
                                    </div>
                                ))}
                            <Space>
                                <Form
                                    style={{ display: 'flex' }}
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        label="User Email"
                                        name="useremail"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input a valid email',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Send
                                        <svg
                                            width="20px"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </Button>
                                </Form>
                            </Space>
                            <>
                                {apiError ? (
                                    <Alert type="error" message={apiError} />
                                ) : null}
                            </>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.supportSection}>
                <h3>
                    NEED HELP? Call us at{' '}
                    {user?.hasSubscription
                        ? `925 - 237 - 6216 `
                        : `(Upgrade your account to get the digits) `}
                    or email brianjenney83@gmail.com
                </h3>
                <small>
                    Yes, that is an actual number to a real human and yes,
                    that's the developer's real email address. We take customer
                    service seriously!
                </small>
            </div>
        </div>
    );
};

export default AccountInfo;
