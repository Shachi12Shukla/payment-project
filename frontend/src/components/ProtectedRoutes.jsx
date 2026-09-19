import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../context/Auth"

const ProtectedRoutes = () => {

    const {isloggedIn} = useAuth();

    if(!isloggedIn) {
        return (
            <Navigate to="/user/signin" replace/>
        )
    }
  return <Outlet/>
}

export default ProtectedRoutes
