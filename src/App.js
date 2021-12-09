import React from 'react';
import { StyleConfig } from './pages/StyleConfig';
import { ConfigContextProvider } from './contexts/ConfigContext';

function App() {
    return (
        <div>
            <ConfigContextProvider>
                <StyleConfig />
            </ConfigContextProvider>
        </div>
    );
}

export default App;
