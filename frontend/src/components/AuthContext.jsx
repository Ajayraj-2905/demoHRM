import React, { createContext, useState, useContext, useEffect, isValidElement, useMemo } from 'react';
// import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        if (token) {
            setIsAuthenticated(checkTokenExpiry(token));
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(token && checkTokenExpiry(token));
    };
    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };
    const backAPI = 'https://backend-hrcompliance.onrender.com/'

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, backAPI }}>
            {children}
        </AuthContext.Provider>
    );
};

function checkTokenExpiry(token) {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded.exp > Date.now() / 1000;
}

export const useAuth = () => useContext(AuthContext);
