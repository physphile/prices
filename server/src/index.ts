import express, { Request, Response } from 'express';
import { Api } from './database/handlers.js';
import { requestHandler } from './decorators/decorators.js';

const app = express();
const port = 3000;

app.get(
    '/smartphones',
    requestHandler((req: Request, res: Response, api: Api) => api.getSmartphones()),
);

app.get(
    '/smartphones/processors',
    requestHandler((req: Request, res: Response, api: Api) => api.getProcessors()),
);

app.get(
    '/smartphones/processors/:id',
    requestHandler((req: Request<{ id: number }>, res: Response, api: Api) => api.getProcessor(req.params.id)),
);

app.get(
    '/smartphones/:id',
    requestHandler(async (req: Request<{ id: number }>, res: Response, api: Api) => api.getSmartphone(req.params.id)),
);

app.listen(port);
