import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

const HomeRedirect = () => {
    const { token } = useAuth();

    if (token) {
        return <Navigate to="/user/dashboard" replace />;     // prevents the user to go back to the auth page again.
    }

    return <Navigate to="/user/signin" replace />;
};

export default HomeRedirect;