import type express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import { routes } from './App';

export async function render(request: express.Request) {
  const { query, dataRoutes } = createStaticHandler(routes);
  const remixRequest = createFetchRequest(request);
  const context = await query(remixRequest);

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(dataRoutes, context);
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouterProvider router={router} context={context} nonce="the-nonce" />
    </React.StrictMode>,
  );
}

export function createFetchRequest(req: express.Request): Request {
  const origin = `${req.protocol}://${req.get('host')}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  const url = new URL(req.originalUrl || req.url, origin);

  const controller = new AbortController();
  req.on('close', () => controller.abort());

  const headers = new Headers();

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  const init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body;
  }

  return new Request(url.href, init);
}
