/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import morganLogger from 'morgan';
import cors from 'cors';
import router from './routes';
require('./database/db');

const app = express();

app.use(morganLogger('dev'));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1', router);

app.get('/', (_req, res) => {
  res.status(200).send('Welcome to HMS API');
});

app.use((req, res) => {
  res.status(404).send('incorrect route');
});

const port = process.env.PORT || 4000;

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

export default app;
