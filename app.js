import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { loginRoutes, registrationRoutes } from './src/api/v1/routes/index.js';
import configEnviron from './src/config/configEnviron.js';
import { mongoDBCon } from './src/config/mongoDBCon.js';
import mongoose from 'mongoose';

dotenv.config();

const { port } = configEnviron

const app = express();
const PORT = port || process.env.PORT || 3000;
const httpServer = createServer(app);


app.use(bodyParser.json());

app.use('/api/v1', loginRoutes);
app.use('/api/v1', registrationRoutes);

const restart = () => mongoDBCon().then(() => {
  console.log('mongodb connected');
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

}).catch(err => {
  console.log('something went wrong,server stopped ,', err);
  restart()
})


restart()