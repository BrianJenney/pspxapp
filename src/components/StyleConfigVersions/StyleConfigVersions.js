import React from 'react';
import { Badge, Space, Card } from 'antd';
import './StyleConfigVersions.css';

const StyleConfigVersions = ({ configs, oldVersions, setActiveVersion }) => {
    if (!(configs || []).length) {
        return <></>;
    }

    return (
        <Card>
            {configs.map((config) => (
                <div key={config.version}>
                    <Space
                        className="hover"
                        onClick={() => setActiveVersion(config)}
                    >
                        <p>V.{config.version}</p>
                        <p>
                            {new Date(config.createdAt).toLocaleString() ||
                                new Date().toLocaleString()}
                        </p>
                        {config.draft && (
                            <p>
                                <Badge>Draft</Badge>
                            </p>
                        )}
                    </Space>
                </div>
            ))}

            <h3>Version History</h3>

            {oldVersions.map((config) => (
                <div key={config.version}>
                    <Space
                        className="hover"
                        onClick={() => setActiveVersion(config)}
                    >
                        <p>V.{config.version}</p>
                        <p>{config.createdAt || new Date().toLocaleString()}</p>
                    </Space>
                </div>
            ))}
        </Card>
    );
};

export default StyleConfigVersions;
