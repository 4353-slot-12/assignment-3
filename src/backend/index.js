import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import router from './routes/index.js';


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const baseDir = path.join(process.cwd(), 'src');

app.use(morgan(':method :url :status'));
app.use(express.static(path.join(baseDir, 'frontend'), {
    extensions: ['html', 'htm']
}));

app.use('/api', router);

app.listen(port, () => {
  console.log(`team-12 assignment-2 listening on port ${port}`)
});