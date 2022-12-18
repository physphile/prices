import express, { Request, Response } from 'express';
import { Api } from './database/handlers.js';
import { requestHandler } from './decorators/decorators.js';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.json());

app.get(
    '/smartphones',
    requestHandler((req: Request, res: Response, api: Api) => api.getSmartphones()),
);

app.get(
    '/smartphones/processors/:id',
    requestHandler((req: Request<{ id: number }>, res: Response, api: Api) => api.getProcessor(req.params.id)),
);

app.get(
    '/smartphones/:id',
    requestHandler(async (req: Request<{ id: number }>, res: Response, api: Api) => api.getSmartphone(req.params.id)),
);

app.options('/smartphones', (req: Request, res: Response) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
    res.set('Access-Control-Allow-Headers', '*');
    res.send();
});

app.put('/smartphones', async (req: Request, res: Response) => {
    try {
        res.set('Access-Control-Allow-Origin', '*');
        res.send();

        const api = await new Api().connect();
        api.addSmartphone(req.body);
    } catch (e: any) {
        res.set(400).send(e.message);
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
