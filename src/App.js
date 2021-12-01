import React from 'react';
import { StyleConfig } from './pages/StyleConfig';
import { ConfigContextProvider } from './contexts/ConfigContext';

function App() {
    return (
        <div style={{ margin: '1em' }}>
            <ConfigContextProvider>
                <StyleConfig />
            </ConfigContextProvider>
        </div>
    );
}

export default App;
