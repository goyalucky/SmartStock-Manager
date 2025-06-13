import { createContext, useState ,useContext} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("stock-user");
        return storedUser ? JSON.parse(storedUser) : null;
    })
    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem("stock-user", JSON.stringify(userData));
        localStorage.setItem("stock-token", token);
    }
    const logout = () => {
        setUser(null);
        localStorage.removeItem("stock-user");
        localStorage.removeItem("stock-token");
    }
    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;