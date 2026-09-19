import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../context/Auth"

const PublicRoutes = () => {

    const {isloggedIn} = useAuth();

    if(isloggedIn) {
        return (
            <Navigate to="/user/dashboard" replace/>
        )
    }
  return <Outlet/>
}

export default PublicRoutes
