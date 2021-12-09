import React, { createContext, useEffect, useState } from 'react';
import { apiClient } from '../utils/apiClient';

export const ConfigContext = createContext({
    configs: [],
    versions: [],
    activeVersion: null,
    setActiveVersion: () => {},
});

export const ConfigContextProvider = ({ children }) => {
    const [configs, setConfigs] = useState([]);
    const [oldVersions, setOldVersions] = useState([]);
    const [activeVersion, setActiveVersion] = useState(null);

    useEffect(() => {
        const fetchConfigs = async () => {
            const data = await apiClient(
                'styles/getallconfigs?spaceid=123ABC',
                {},
                { method: 'GET' }
            );
            setConfigs(data?.data?.configs);
            setOldVersions(data?.data?.versions);
            setActiveVersion(data?.data?.configs?.[0]);
        };
        fetchConfigs();
    }, []);

    return (
        <ConfigContext.Provider
            value={{
                configs,
                oldVersions,
                setActiveVersion,
                activeVersion,
                setConfigs,
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
};
