
import React from 'react';

const UserContext = React.createContext({})

// dispatcher logic

export const UserContextProvider = () => {

    const [user, setUser] = React.useState(null);
    const [token, setToken] = React.useState(null);

    // You can choose to wrap this in a useMemo if you want to be extra careful about potential rerenders
    // const UserContextStore = {
    //     user,
    //     setUser,
    //     token,
    //     setToken
    // }

    return <UserContext.Provider value={[user, setUser, token, setToken]}></UserContext.Provider>
}

export const useUserContext = () => React.useContext(UserContext)