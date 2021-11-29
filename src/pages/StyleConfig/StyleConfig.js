import React, { useState } from 'react';
import { StyleConfigForm } from '../../components';
import { Button, Space } from 'antd';
import { CodeTwoTone } from '@ant-design/icons';
import vkbeautify from 'vkbeautify';
import { apiClient } from '../../utils/apiClient';

const StyleConfig = () => {
    const [formAmt, setFormAmt] = useState([0]);
    const [cssPreview, setCssPreview] = useState(null);
    const [allForms, addToAllForms] = useState([]);

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

    const saveAs = async (saveType) => {
        const isPreview = saveType === 'draft';

        const styles = getAllFormData();

        const styleData = styles.map((style) => {
            return {
                element: style.element,
                styles: style.styles.map((s) => `${s.rule}: ${s.val}`),
                minWidth: style.minWidth,
                maxWidth: style.maxWidth,
            };
        });

        apiClient('styles/addconfig', {
            isPreview,
            spaceid: '123ABC',
            styles: styleData,
        });
    };

    return (
        <>
            <header style={{ margin: 'auto', textAlign: 'center' }}>
                <h1>
                    PSPX Rule Configurator{' '}
                    <CodeTwoTone twoToneColor="#eb2f96" />
                </h1>
            </header>
            <div
                style={{
                    width: '80%',
                    margin: 'auto',
                    marginTop: '3em',
                    display: 'flex',
                }}
            >
                <div stlye={{}}>
                    {formAmt.map((i, idx) => (
                        <div
                            style={{
                                width: '100%',
                                marginTop: idx > 0 ? '1em' : 0,
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
                                    {formAmt.length > 1 && (
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
                                    setCssPreview(
                                        vkbeautify.css(allVals.join(''))
                                    );
                                }}
                            >
                                Generate Preview
                            </Button>
                        </Space>
                    </div>
                </div>
                <div style={{ marginLeft: '20%' }}>
                    <pre>
                        <code>{cssPreview}</code>
                    </pre>
                </div>
            </div>
        </>
    );
};

export default StyleConfig;
