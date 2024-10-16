import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.auth_token;
    if (!token) {
        res.status(401).json({ message: " Unauthorized." });
        return;
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
        req.userId = (decodedToken as JwtPayload).userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: " Unauthorized." });
        return;
    }

}

export default verifyToken;