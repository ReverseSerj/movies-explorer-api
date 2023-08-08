require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { handleErr } = require('./middlewares/handle-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');
const { limiter } = require('./utils/limiter');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const app = express();

app.use(helmet());
app.use(cors);
app.use(limiter);

mongoose.connect(DB_URL).catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handleErr);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
