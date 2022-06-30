import React from 'react';
import { Space, Spin } from 'antd';

const Loader = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '3em',
            }}
        >
            <Space size="middle">
                <Spin size="large" />
                <h2>Loading...</h2>
            </Space>
        </div>
    );
};

export default Loader;
