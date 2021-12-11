import React from 'react';
import { StyleConfigContainer } from './pages/StyleConfig';
import { ConfigContextProvider } from './contexts/ConfigContext';

function App() {
    return (
        <div>
            <ConfigContextProvider>
                <StyleConfigContainer />
            </ConfigContextProvider>
        </div>
    );
}

export default App;
