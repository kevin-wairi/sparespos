import React from 'react'
const UrlContext = React.createContext();

function UrlProvider({ children }) {

    const apiUrl = 'http://localhost:3000'

    return (
        <UrlContext.Provider value={apiUrl}>
            {children}
        </UrlContext.Provider>
    );

}

export { UrlContext, UrlProvider }
