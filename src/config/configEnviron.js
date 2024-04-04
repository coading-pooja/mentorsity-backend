import dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV; // 'dev', 'prod', 'local'

let configEnviron;

if (env === 'prod') {
  configEnviron = {
    db: process.env.MONGODB_URI,
    port: process.env.PORT,
  };
} else if (env === 'dev') {
  configEnviron = {
    db: 'mongodb://localhost/devDB',
    port: 3001,
  };
} else { // Default to 'local'
  configEnviron = {
    db: 'mongodb://0.0.0.0/localDB',
    port: 3000,
  };
}

export default configEnviron;
