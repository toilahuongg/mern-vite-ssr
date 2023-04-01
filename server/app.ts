import * as express from 'express';
import * as fsp from 'fs/promises';
import * as path from 'path';
import { ViteDevServer, createServer as createViteServer } from 'vite';
import { installGlobals } from '@remix-run/node';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';

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
  } else {
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(compression());
    app.use(express.static(resolve('dist/client')));
  }

  // init db

  import('./dbs/init.mongodb');
  // routes
  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    try {
      let template;
      let render;

      if (!isProduction) {
        template = await fsp.readFile(resolve('../index.html'), 'utf8');
        template = await vite.transformIndexHtml(url, template);
        render = await vite.ssrLoadModule('src/entry.server.tsx').then((m) => m.render);
      } else {
        template = await fsp.readFile(resolve('dist/client/index.html'), 'utf8');
        render = (await import(resolve('dist/server/entry.server.js'))).render;
      }

      try {
        const appHtml = await render(req);
        const html = template.replace('<!--app-html-->', appHtml);
        res.setHeader('Content-Type', 'text/html');
        return res.status(200).end(html);
      } catch (e) {
        if (e instanceof Response && e.status >= 300 && e.status <= 399) {
          return res.status(e.status).redirect(e.headers.get('Location')!);
        }
        throw e;
      }
    } catch (error) {
      if (!isProduction) {
        vite.ssrFixStacktrace(error as Error);
      }
      console.log((error as Error).stack);
      res.status(500).end((error as Error).stack);
    }
  });
  return app;
};

export default createServer;
