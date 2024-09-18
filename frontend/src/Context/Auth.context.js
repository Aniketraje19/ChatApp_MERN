import { createContext, useState, useEffect, useContext } from "react"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
        token: null,
    })

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate async auth check
        const fetchAuthState = async () => {
            const token = localStorage.getItem("token");
            const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

            // Simulate some delay
            await new Promise(resolve => setTimeout(resolve, 500));

            if (token && user) {
                setAuthState({
                    isAuthenticated: true,
                    user,
                    token,
                });
            } else {
                setAuthState({
                    isAuthenticated: false,
                    user: null,
                    token: null,
                });
            }
            setLoading(false); // Auth check is complete
        };

        fetchAuthState();
    }, []);

    const login = (user, token) => {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setAuthState({
            isAuthenticated: true,
            user,
            token,
        })
    }

        const logout = () => {
            localStorage.removeItem("token")
            localStorage.removeItem("user")

            setAuthState({
                isAuthenticated: false,
                user: null,
                token: null,
            })
        }


    return (
        <AuthContext.Provider value={{ authState, login, logout,loading }}>
            {children}
        </AuthContext.Provider>
    )

}

const useAuth = () =>{
    return useContext(AuthContext)
}


export { AuthProvider ,useAuth}