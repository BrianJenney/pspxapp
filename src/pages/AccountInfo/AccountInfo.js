import React, { useState } from 'react';
import { Input, Button, Space } from 'antd';

const AccountInfoContainer = ({ user }) => {
    const [isHidden, setIsHidden] = useState(false);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                margin: 'auto',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                paddingTop: '5em',
            }}
        >
            <Space>
                <Input
                    type={isHidden ? 'password' : 'text'}
                    disabled
                    value={user?.spaceId}
                />
                <Button
                    onClick={() => setIsHidden(!isHidden)}
                    title={isHidden ? 'Reveal API Key' : 'Hide API Key'}
                >
                    {isHidden ? 'Reveal API Key' : 'Hide API Key'}
                </Button>
            </Space>
            <div>
                <code>
                    <b>Add this script to your site:</b>
                </code>
                <br />
                <div style={{ marginTop: '2em' }}>
                    <code>
                        {`<script src="https://cdn.jsdelivr.net/gh/BrianJenney/slapjunky@stage/public/css.js"></script>`}
                    </code>
                    <br />
                    <code>
                        <pre>
                            {`<script>
if (window.pspx) {
    window.pspx.init({ spaceid: <APIKEY>, isPreview: <ISPREVIEW> });
} 
</script>`}
                        </pre>
                    </code>
                </div>
            </div>
        </div>
    );
};

export default AccountInfoContainer;
