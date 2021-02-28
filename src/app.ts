import 'reflect-metadata';
import express from 'express';

import createConnection from './database';
import router from './routes';

const connection = createConnection();
const app = express();

app.use(express.json());
app.use(router);

export { connection };
export default app;
