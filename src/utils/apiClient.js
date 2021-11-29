import axios from 'axios';

export const PROD_URL =
    'https://fjsu16onvd.execute-api.us-east-1.amazonaws.com/production/api/';
export const STAGE_URL =
    'https://4mxwytmbdh.execute-api.us-east-1.amazonaws.com/dev/api/';

export const getBaseUrl = () => {
    const urlsByEnv = {
        production: PROD_URL,
        dev: STAGE_URL,
        stage: STAGE_URL,
    };
    const env = process.env.REACT_APP_ENV;

    return urlsByEnv[env] || 'http://localhost:5000/api/';
};

export const apiClient = (path, data, overrides = {}) => {
    const config = {
        method: 'post',
        url: `${getBaseUrl()}${path}`,
        data,
    };

    return axios({ ...config, ...overrides });
};
