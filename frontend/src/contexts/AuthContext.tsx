import { createContext, useContext, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const navigate = useNavigate();

    // Check if user has already received token
    useEffect(() => {
        const checkAuth = async() => {
            const response = await fetch('/api/auth/status', {method:"GET", credentials: "include"});
            if (response.ok) {
                const data = await response.json()
                if (data.status === 'authenticated'){
                    setIsAuthenticated(true);
                }
            }
            setIsLoading(false);
        }
        checkAuth();
    }, [])

    const login = () => {
        setIsAuthenticated(true);
        navigate("/accounts");
    }

    const logout = async () => {
        await fetch('/api/auth/logout', {
            method: "POST",
        })
        setIsAuthenticated(false);
        navigate("/")
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
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