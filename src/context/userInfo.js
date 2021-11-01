import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [userInfo, setUserInfo] = useState("");
    const [isAuth, setIsAuth] = useState(false);

    const login = (token) => {
        localStorage.setItem("user",JSON.stringify(token)); 
        setUserInfo(token);
        setIsAuth(true)
    };
    
    const logout = () => {
        setUserInfo('error'); // this should be empty 
        localStorage.removeItem("user");
        setIsAuth(false)
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUserInfo(JSON.parse(user))
            setIsAuth(true);
        }
    },[])

    return (
        <AuthContext.Provider value={{isAuth, userInfo, login , logout}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
