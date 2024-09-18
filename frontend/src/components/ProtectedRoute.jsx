import { useEffect, useState } from "react";
import { useAuth } from "../Context/Auth.context";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
    const { authState: { isAuthenticated }, loading } = useAuth();
    const navigate = useNavigate();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                console.log("Not authenticated, redirecting to /auth");
                navigate("/auth");
            } else {
                setIsReady(true);
            }
        }
    }, [isAuthenticated, loading, navigate]);
    
    if (loading || !isReady) {
        return <div>Loading...</div>;
    }

    return children;
}
