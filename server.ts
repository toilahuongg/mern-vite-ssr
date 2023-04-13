import express from 'express';
import fsp from 'fs/promises';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import { ViteDevServer, createServer as createViteServer } from 'vite';
import { installGlobals } from '@remix-run/node';

import rootRouter from './server/routes';
import appConfig from '@server/configs/app.config';

installGlobals();

const root = process.cwd();
const isProduction = process.env.NODE_ENV === 'production';
function resolve(p: string) {
  return path.resolve(__dirname, p);
}

const createServer = async () => {
  const app = express();
  let vite: ViteDevServer;

  // middlewares
  if (!isProduction) {
    vite = await createViteServer({
      root,
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);
    // app.use(morgan('dev'));
  } else {
    app.use(morgan('tiny'));
    app.use(helmet());
    app.use(compression());
    app.use(express.static(resolve('src')));
  }
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // init db

  import('./server/dbs/init.mongodb');
  // routes
  app.use('/api/v1', rootRouter);

  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    // Use a separate HTML file for the "Inbox" app.
    const appDirectory = url.startsWith('/admin') ? 'dashboard' : 'client';
    let htmlFileToLoad;

    if (isProduction) {
      htmlFileToLoad = path.join('src', appDirectory, 'index.html');
    } else {
      htmlFileToLoad = path.join(appDirectory, 'index.html');
    }

    try {
      let html = await fsp.readFile(path.join(__dirname, htmlFileToLoad), 'utf8');

      if (!isProduction) {
        html = await vite.transformIndexHtml(req.url, html);
      }

      res.setHeader('Content-Type', 'text/html');
      return res.status(200).end(html);
    } catch (error) {
      if (!isProduction) vite.ssrFixStacktrace(error as Error);
      console.log((error as Error).stack);
      return res.status(500).end((error as Error).stack);
    }
  });

  return app;
};

createServer().then((app) => {
  app.listen(appConfig.app.port, () => {
    console.log(`Server is started: http://localhost:${appConfig.app.port}`);
  });
});
