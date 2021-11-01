import { Request, Response, NextFunction } from 'express';

function isAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.userPrivileges)
        return res.json({ message: 'You are not authorized to create new authors' });
    next();
}

module.exports = isAdmin