import React, { useState, useContext, useEffect } from 'react';
import { StyleConfigForm } from '../../components';
import { Button, Space, Switch, Modal, Tag } from 'antd';
import { CodeTwoTone } from '@ant-design/icons';
import vkbeautify from 'vkbeautify';
import { apiClient } from '../../utils/apiClient';
import { StyleConfigVersions } from '../../components/StyleConfigVersions';
import { ConfigContext } from '../../contexts/ConfigContext';
import './StyleConfig.css';

const StyleConfig = () => {
    const {
        oldVersions,
        configs,
        setActiveVersion,
        activeVersion,
        setConfigs,
    } = useContext(ConfigContext);

    const [formAmt, setFormAmt] = useState([0]);
    const [defaultVals, setDefaultVals] = useState(null);
    const [cssPreview, setCssPreview] = useState(null);
    const [allForms, addToAllForms] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        if (activeVersion) {
            setActiveVersion(activeVersion);
            setDefaultVals(activeVersion);
            setIsActive(activeVersion.isActive);
            setFormAmt([]);
        }
    }, [activeVersion, setActiveVersion]);

    const getAllFormData = () => {
        return allForms
            .map((getVals) => {
                return getVals();
            })
            .filter((val) => val.element);
    };

    const generatePreview = (json) => {
        let myStringOfstyles = '';

        const currentRule = `${json.element} { ${json.styles
            .map(({ rule, val }) => {
                return `${rule} : ${val} !important; `;
            })
            .join(' ')} } `;

        if (json.maxWidth || json.minWidth) {
            const screenSizeRule = json.maxWidth ? 'max-width' : 'min-width';
            myStringOfstyles += `@media only screen and (${screenSizeRule}: ${
                json.minWidth || json.maxWidth
            }px) {
                                    ${currentRule}
                                }`;
        } else {
            myStringOfstyles += currentRule;
        }

        return myStringOfstyles;
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const saveAs = async (saveType) => {
        const isPreview = saveType === 'draft';

        const styles = getAllFormData();

        const styleData = styles
            .filter((style) => style.element)
            .map((style) => {
                return {
                    element: style.element,
                    styles: style.styles.map((s) => `${s.rule}: ${s.val}`),
                    minWidth: style.minWidth,
                    maxWidth: style.maxWidth,
                };
            });

        try {
            if (activeVersion && activeVersion.draft) {
                await apiClient('styles/savedraft', {
                    spaceid: '123ABC',
                    draftId: activeVersion?._id,
                });

                setActiveVersion((prev) => ({ ...prev, draft: false }));
            } else {
                const res = await apiClient('styles/addconfig', {
                    isPreview,
                    spaceid: '123ABC',
                    styles: styleData,
                    isActive,
                });
                setConfigs((prev) => [...prev, res.data.newConfig]);
            }
        } catch (e) {}
    };

    const updateActiveState = async (activeState) => {
        if (activeVersion) {
            await apiClient('styles/updateActiveState', {
                isActive: activeState,
                configId: activeVersion._id,
            });

            setActiveVersion((prev) => ({ ...prev, isActive: activeState }));
        }
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

    return (
        <>
            <header
                style={{
                    margin: 'auto',
                    textAlign: 'center',
                    flexWrap: 'wrap',
                }}
            >
                <h1 style={{ backgroundColor: '#262626', color: '#ffff' }}>
                    PSPX Rule Configurator{' '}
                    <CodeTwoTone twoToneColor="#eb2f96" />
                </h1>
            </header>
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
                                        />
                                        <div>
                                            <Space>
                                                <Button
                                                    type="primary"
                                                    style={{ marginTop: '2em' }}
                                                    onClick={() =>
                                                        setFormAmt((prev) => [
                                                            ...prev,
                                                            prev[
                                                                prev.length - 1
                                                            ] + 1,
                                                        ])
                                                    }
                                                >
                                                    Add New Rule
                                                </Button>

                                                {defaultVals.styles.length >
                                                    1 && (
                                                    <Button
                                                        type="danger"
                                                        style={{
                                                            marginTop: '2em',
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
                                    {formAmt.length > 1 ||
                                        (activeVersion && (
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
                                        ))}
                                </Space>
                            </div>
                        </div>
                    ))}
                    <div>
                        <Space>
                            <Button
                                type="primary"
                                style={{ marginTop: '2em' }}
                                onClick={() => saveAs('non-draft')}
                            >
                                Save
                            </Button>
                            <Button
                                type="dashed"
                                style={{ marginTop: '2em' }}
                                onClick={() => saveAs('draft')}
                            >
                                Save as Draft
                            </Button>
                            <Button
                                type="ghost"
                                style={{ marginTop: '2em' }}
                                onClick={() => {
                                    const retVal = allForms.map((getVals) => {
                                        return getVals();
                                    });
                                    const allVals = retVal
                                        .filter((val) => val.element)
                                        .map((val) => generatePreview(val));

                                    console.log(
                                        vkbeautify.css(allVals.join(''))
                                    );
                                    setCssPreview(
                                        vkbeautify.css(allVals.join(''))
                                    );

                                    showModal();
                                }}
                            >
                                Generate Preview
                            </Button>
                        </Space>
                    </div>
                    <Space align="center" style={{ marginTop: '1em' }}>
                        <Switch
                            checked={isActive}
                            onChange={async (bool) => {
                                if (activeVersion) {
                                    console.log({ bool });
                                    await updateActiveState(bool);
                                }
                                setIsActive(!isActive);
                            }}
                        />
                        <p
                            style={{ marginTop: 0, marginBottom: 0 }}
                            className={isActive ? 'active' : 'non-active'}
                        >
                            {isActive ? 'Active' : 'Not Activated'}
                        </p>
                    </Space>
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
