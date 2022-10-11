import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

export interface RequestWithAuth<
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = qs.ParsedQs,
    Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
    userId: string;
}

export interface RequestWithFileProps<
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = qs.ParsedQs,
    Locals extends Record<string, any> = Record<string, any>
> extends RequestWithAuth<P, ResBody, ReqBody, ReqQuery, Locals> {
    title: string;
    slug: string;
}
