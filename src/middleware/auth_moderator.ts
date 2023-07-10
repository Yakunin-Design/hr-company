import { Request, Response, NextFunction } from 'express';

export default function auth_moderator(req: Request, res: Response, next: NextFunction) {
    const user_type = res.locals.jwt.user_type;

    let give_access = false;
    switch (user_type) {
        case "аdmin" || "moderator" || "employer": give_access = true;
    }

    if (!give_access) {
        return res.status(401).send("access denied");
    }

    next();
}
