import { createContext, useContext, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false);
    const navigate = useNavigate();

    // Check if user has already received token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, [])

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        navigate("/accounts");
    }

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate("/")
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
};

// Use to make sure a component is using AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used with an AuthProvider');
    return context;
}