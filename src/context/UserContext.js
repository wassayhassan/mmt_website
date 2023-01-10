import React, {useState, useEffect, createContext} from 'react';
const UserContext = createContext();

const  UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    useEffect(()=> {
        setUser(JSON.parse(localStorage.getItem("user")));
    }, [])
    const logoutUser = () => {
        localStorage.setItem("user", null);
        setUser(null);
    }
    const savelogin = (value) => {
        localStorage.setItem('user', JSON.stringify(value));
        setUser(value);
    }
    return (
        <UserContext.Provider value= {{user, logoutUser, savelogin}}>
          {children}
        </UserContext.Provider>
    )
}
export {UserContext, UserProvider}