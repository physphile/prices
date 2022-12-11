import { Request, Response } from 'express';
import { Api } from '../database/handlers.js';

export function requestHandler(target: any) {
    return async function (req: Request, res: Response<string>) {
        res.set('Access-Control-Allow-Origin', '*');
        try {
            const api = await new Api().connect();

            const result = await target(req, res, api);

            res.set('Content-type', 'application/json');
            res.send(JSON.stringify(result));

            api.end();
        } catch (e: any) {
            res.status(400).send(e.message);
        }
    };
}
