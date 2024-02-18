
import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);

    const [loginFin, setLoginFin] = useState(true);


    // checking token login
    const checkLogin = async () => {
        const token = localStorage.getItem('tokenStore');
        if (token) {

            const verified = await axios.get(`/api/user/verify`, { headers: { Authorization: token } })
            axios.defaults.headers.common["Authorization"] = token

            setIsLogin(verified.data);
            if (verified.data === false) {
                return localStorage.clear();
            }
        } else {
            setIsLogin(false)
        }

    }


    useEffect(() => {

        try {
            if (loginFin) {
                checkLogin();
            }
            return setLoginFin(false)




        } catch (err) {
            console.log(err);
        }


    }, [loginFin])










    const state = {

        isLogin: [isLogin, setIsLogin]

    }




    return (
        <DataContext.Provider value={state}>
            {children}
        </DataContext.Provider>
    )




}
