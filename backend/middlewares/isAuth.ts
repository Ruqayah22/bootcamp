import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';


function isAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.headers['authorization'])
        return res.json({ message: 'Authorization token is required' });

    const token = req.headers['authorization'].split(' ')[1];
    try {
        const payload = verify(token, `${process.env.secret}`);
        req.userPrivileges = (payload as { privileges: number }).privileges;
        next()
    } catch (error) {
        res.json({ message: "Token is invalid" });
    }
}

export default isAuth;