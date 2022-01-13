import React, { createContext, useEffect, useState, useContext } from 'react';
import { apiClient } from '../utils/apiClient';
import { UserContext } from './UserContext';

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
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchConfigs = async () => {
            const data = await apiClient(
                `styles/getallconfigs?spaceid=${user.spaceKey}`,
                {},
                { method: 'GET' }
            );
            setConfigs(data?.data?.configs);
            setOldVersions(data?.data?.versions);
            setActiveVersion(data?.data?.configs?.[0]);
        };
        if (user?.spaceId) fetchConfigs();
    }, [user?.spaceId]);

    return (
        <ConfigContext.Provider
            value={{
                configs,
                oldVersions,
                setActiveVersion,
                activeVersion,
                setOldVersions,
                setConfigs,
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
};
