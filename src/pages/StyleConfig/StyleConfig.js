import React, { useState } from 'react';
import { Space, Button, Tag, Modal, Switch, Tooltip } from 'antd';
import { StyleConfigVersions } from '../../components/StyleConfigVersions';
import { StyleConfigForm } from '../../components/StyleConfigForm';
import './StyleConfig.css';

const StyleConfig = ({
    setActiveVersion,
    activeVersion,
    saveAs,
    updateActiveState,
    createPreviewCss,
    cssPreview,
    allForms,
    addToAllForms,
    defaultVals = [],
    formAmt,
    setFormAmt,
    oldVersions = [],
    configs,
    setIsActive,
    isActive,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const removeRule = (idx) => {
        setActiveVersion((prev) => {
            return {
                ...prev,
                styles: prev.styles.filter((a, i) => i !== idx),
            };
        });

        addToAllForms(allForms.filter((a, i) => i !== idx));
    };

    const isOldVersion = oldVersions
        .map((v) => v._id)
        .includes(activeVersion?._id);

    return (
        <>
            <div
                style={{
                    margin: 'auto',
                    marginTop: '3em',
                    display: 'flex',
                    justifyContent: 'space-around',
                }}
            >
                <div>
                    <>
                        {activeVersion && (
                            <div style={{ margin: '1em 0' }}>
                                {activeVersion.draft && (
                                    <Tag color="red">Draft</Tag>
                                )}
                                <Tag color="volcano">
                                    Version {activeVersion.version}
                                </Tag>
                            </div>
                        )}

                        {activeVersion &&
                            (defaultVals?.styles || []).map(
                                (defaultVal, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            width: '100%',
                                            marginTop: idx > 0 ? '1em' : 0,
                                        }}
                                    >
                                        <StyleConfigForm
                                            addToAllForms={addToAllForms}
                                            defaultVals={defaultVal}
                                            isEditable={!isOldVersion}
                                        />
                                        <div>
                                            <Space>
                                                {!isOldVersion && (
                                                    <Button
                                                        type="primary"
                                                        style={{
                                                            marginTop: '2em',
                                                        }}
                                                        onClick={() =>
                                                            setFormAmt(
                                                                (prev) => [
                                                                    ...prev,
                                                                    prev[
                                                                        prev.length -
                                                                            1
                                                                    ] + 1,
                                                                ]
                                                            )
                                                        }
                                                    >
                                                        Add New Rule
                                                    </Button>
                                                )}

                                                {defaultVals.styles.length >
                                                    1 &&
                                                    !isOldVersion && (
                                                        <Button
                                                            type="danger"
                                                            style={{
                                                                marginTop:
                                                                    '2em',
                                                            }}
                                                            onClick={() =>
                                                                removeRule(idx)
                                                            }
                                                        >
                                                            Remove Rule
                                                        </Button>
                                                    )}
                                            </Space>
                                        </div>
                                    </div>
                                )
                            )}
                    </>
                    {formAmt.map((i, idx) => (
                        <div
                            style={{
                                width: '100%',
                                marginTop: idx > 0 || activeVersion ? '1em' : 0,
                            }}
                            key={i}
                        >
                            <StyleConfigForm addToAllForms={addToAllForms} />
                            <div>
                                <Space>
                                    <Button
                                        type="primary"
                                        style={{ marginTop: '2em' }}
                                        onClick={() =>
                                            setFormAmt((prev) => [
                                                ...prev,
                                                prev[prev.length - 1] + 1,
                                            ])
                                        }
                                    >
                                        Add New Rule
                                    </Button>
                                    {((formAmt.length > 1 && idx > 0) ||
                                        activeVersion) && (
                                        <Button
                                            type="danger"
                                            style={{ marginTop: '2em' }}
                                            onClick={() =>
                                                setFormAmt((prev) => {
                                                    return prev.filter(
                                                        (a, i) => i !== idx
                                                    );
                                                })
                                            }
                                        >
                                            Remove Rule
                                        </Button>
                                    )}
                                </Space>
                            </div>
                        </div>
                    ))}
                    <div>
                        <Space>
                            <Tooltip
                                title={
                                    isOldVersion
                                        ? 'Revert to this version and activate'
                                        : null
                                }
                                color="pink"
                            >
                                <Button
                                    type="primary"
                                    style={{ marginTop: '2em' }}
                                    onClick={() => saveAs('non-draft')}
                                >
                                    {isOldVersion
                                        ? 'Save and Activate'
                                        : 'Save'}
                                </Button>
                            </Tooltip>
                            {!isOldVersion && (
                                <Button
                                    type="dashed"
                                    style={{ marginTop: '2em' }}
                                    onClick={() => saveAs('draft')}
                                >
                                    Save as Draft
                                </Button>
                            )}
                            <Button
                                type="ghost"
                                style={{ marginTop: '2em' }}
                                onClick={() => {
                                    createPreviewCss();
                                    showModal();
                                }}
                            >
                                Generate Preview
                            </Button>
                        </Space>
                    </div>
                    {activeVersion && !activeVersion.draft && !isOldVersion && (
                        <Space align="center" style={{ marginTop: '1em' }}>
                            <Tooltip
                                title="Activate this config to make these style changes live"
                                color="pink"
                            >
                                <Switch
                                    checked={isActive}
                                    onChange={async (bool) => {
                                        if (activeVersion) {
                                            await updateActiveState(bool);
                                        }
                                        setIsActive(!isActive);
                                    }}
                                />
                            </Tooltip>
                            <p
                                style={{ marginTop: 0, marginBottom: 0 }}
                                className={isActive ? 'active' : 'non-active'}
                            >
                                {isActive ? 'Active' : 'Not Activated'}
                            </p>
                        </Space>
                    )}
                </div>
                <div>
                    <StyleConfigVersions
                        oldVersions={oldVersions}
                        configs={configs}
                        setActiveVersion={setActiveVersion}
                    />
                </div>
            </div>

            <Modal
                title="CSS Preview"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                ]}
            >
                <div>
                    <pre>
                        <code>{cssPreview}</code>
                    </pre>
                </div>
            </Modal>
        </>
    );
};

export default StyleConfig;
