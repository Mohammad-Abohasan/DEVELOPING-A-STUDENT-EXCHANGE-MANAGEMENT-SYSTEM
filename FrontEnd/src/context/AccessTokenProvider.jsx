import { createContext, useState } from "react";

export const AccessTokenContext = createContext();

const AccessTokenProvider = (props) => {
    const [accessToken, setAccessToken] = useState('');

    const handleSetAccessToken = (newAccessToken) => {
        setAccessToken(newAccessToken);
    }

    return (
        <AccessTokenContext.Provider value={{ accessToken, setAccessToken: handleSetAccessToken }}>
            {props.children}
        </AccessTokenContext.Provider>
    )
}

export default AccessTokenProvider;