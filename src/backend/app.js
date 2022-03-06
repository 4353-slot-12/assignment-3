import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/index.js';


dotenv.config();
const app = express();
const baseDir = path.join(process.cwd(), 'src');


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(':method :url :status'));
app.use(express.static(path.join(baseDir, 'frontend'), {
    extensions: ['html', 'htm']
}));

app.use('/api', router);

export default app;