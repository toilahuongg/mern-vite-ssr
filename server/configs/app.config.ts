import * as dotenv from 'dotenv';

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

const DEV = {
  app: {
    port: process.env.DEV_APP_PORT || 3006,
    isProd,
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'portfolio',
    user: process.env.DEV_DB_USER || 'root',
    pass: process.env.DEV_DB_PASS || '',
  },
};

const PROD = {
  app: {
    port: process.env.PROD_APP_PORT || 3006,
    isProd,
  },
  db: {
    host: process.env.PROD_DB_HOST || 'localhost',
    port: process.env.PROD_DB_PORT || 27017,
    name: process.env.PROD_DB_NAME || 'portfolio',
    user: process.env.PROD_DB_USER || 'root',
    pass: process.env.PROD_DB_PASS || '',
  },
};

const config = { DEV, PROD };

export default config[isProd ? 'PROD' : 'DEV'];
