import React, { useState, useContext, useEffect } from 'react';
import { message } from 'antd';
import { Loader } from '../../components';
import vkbeautify from 'vkbeautify';
import { apiClient } from '../../utils/apiClient';
import { ConfigContext } from '../../contexts/ConfigContext';
import { UserContext } from '../../contexts/UserContext';
import StyleConfig from './StyleConfig';

const StyleConfigContainer = () => {
    const {
        oldVersions,
        configs,
        setActiveVersion,
        activeVersion,
        setConfigs,
    } = useContext(ConfigContext);

    const { user, isLoading } = useContext(UserContext);

    const [formAmt, setFormAmt] = useState([0]);
    const [defaultVals, setDefaultVals] = useState(null);
    const [cssPreview, setCssPreview] = useState(null);
    const [allForms, addToAllForms] = useState([]);
    const [isActive, setIsActive] = useState(false);

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

    const createPreviewCss = () => {
        const retVal = allForms.map((getVals) => {
            return getVals();
        });

        const allVals = retVal
            .filter((val) => val.element)
            .map((val) => generatePreview(val));
        const cssString = allVals.join('');
        setCssPreview(vkbeautify.css(cssString));
    };

    const handleApiResponse = (
        text = 'Successfully Saved',
        type = 'success'
    ) => {
        message[type](text);
    };

    const saveAs = async (saveType, immediatelyActivate) => {
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
            const spaceid = user.spaceKey;

            if (activeVersion && activeVersion.draft) {
                await apiClient('styles/savedraft', {
                    spaceid,
                    draftId: activeVersion?._id,
                });

                setActiveVersion((prev) => ({ ...prev, draft: false }));
                handleApiResponse('Successfully saved draft');
            } else {
                const res = await apiClient('styles/addconfig', {
                    isPreview,
                    spaceid,
                    styles: styleData,
                    isActive: immediatelyActivate ? true : false,
                });
                setConfigs((prev) => [...prev, res.data.newConfig]);
                setActiveVersion((prev) => ({
                    ...prev,
                    ...res.data.newConfig,
                }));
                handleApiResponse('Successfully saved config');
            }
        } catch (e) {
            handleApiResponse(
                `Oops, looks like there was an error saving your config : ${e.message}`,
                'error'
            );
        }
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

    if (isLoading) {
        return <Loader />;
    }

    return (
        <StyleConfig
            setActiveVersion={setActiveVersion}
            activeVersion={activeVersion}
            saveAs={saveAs}
            updateActiveState={updateActiveState}
            createPreviewCss={createPreviewCss}
            cssPreview={cssPreview}
            allForms={allForms}
            addToAllForms={addToAllForms}
            defaultVals={defaultVals}
            oldVersions={oldVersions}
            setFormAmt={setFormAmt}
            formAmt={formAmt}
            configs={configs}
            setIsActive={setIsActive}
            isActive={isActive}
            user={user}
        />
    );
};

export default StyleConfigContainer;
