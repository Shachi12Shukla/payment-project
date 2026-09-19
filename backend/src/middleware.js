import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config.js";

function authMiddleware(req,res,next){
    const token = req.headers.token;

    if(!token){
        res.status(403).send("you are not logged in");
        return;
    }

    const decoded = jwt.verify(token,JWT_SECRET);
    const userId = decoded.userId;

    if(!userId){
        res.status(403).send("malformed token");
        return;
    }

    req.userId = userId;

    next();
}


export default authMiddleware;