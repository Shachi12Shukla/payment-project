import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isloggedIn, setIsLoggedIn] = useState( () => {
        return Boolean(localStorage.getItem("token"));
    } )

    const [userData, setUserData] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    })

    const login = (newToken, user) => {
        localStorage.setItem("token", newToken);
        if(user){
            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            setUserData(user);
        }

        setIsLoggedIn(true);

    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUserData(null);
        setIsLoggedIn(false);
    }

    return (

        <AuthContext.Provider value={{login, logout, userData, setUserData, isloggedIn}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}