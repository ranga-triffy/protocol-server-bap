import { NextFunction, Request, Response } from "express";
import { buildContext } from "../utils/context";

export async function contextMiddleware(req: Request, res: Response, next: NextFunction, action: string) {
    try {
        if(!req.body.context){
            throw ('Context not Found');
        }

        const context=buildContext(req.body.context, action);
        req.body.context=context;
        next();
    } catch (error) {
        next(error);
    }
}