import React from 'react';
import { Space } from 'antd';

const StyleConfigVersions = ({ configs, oldVersions, setActiveVersion }) => {
    if (!(configs || []).length) {
        return <></>;
    }

    return (
        <div>
            {configs.map((config) => (
                <Space>
                    <p>V.{config.version}</p>
                    <p>
                        {new Date(config.createdAt).toLocaleString() ||
                            new Date().toLocaleString()}
                    </p>
                </Space>
            ))}

            <h3>Version History</h3>

            {oldVersions.map((config) => (
                <Space>
                    <p>V.{config.version}</p>
                    <p>{config.createdAt || new Date().toLocaleString()}</p>
                </Space>
            ))}
        </div>
    );
};

export default StyleConfigVersions;
