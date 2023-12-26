import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { inferAsyncReturnType } from '@trpc/server';

import { getPayloadClient } from './get-payload';
import { nextApp, nextHandler } from './next-utils';
import { appRouter } from './trpc';
import bodyParser from 'body-parser';
import { IncomingMessage } from 'http';
import { stripeWebhookHandler } from './webhooks';
import nextBuild from 'next/dist/build'
import path from 'path';
import { PayloadRequest } from 'payload/types';
import { parse } from 'url';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const createContext = ({ req, res, }: trpcExpress.CreateExpressContextOptions) => ({ req, res, })

export type WebhookRequest = IncomingMessage & { rawBody: Buffer };

export type ExpressContext = inferAsyncReturnType<typeof createContext>;

const start = async () => {

  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`)
      },
    },
  });

  const webhookMiddleware = bodyParser.json({
    verify: (req: WebhookRequest, _, buffer) => {
      req.rawBody = buffer
    }
  })

  app.post('/api/webhooks/stripe', webhookMiddleware, stripeWebhookHandler)

  const cartRouter = express.Router()
  
  cartRouter.use(payload.authenticate)

  cartRouter.get('/', (req, res) => {
    const request = req as PayloadRequest

    if (!request.user) return res.redirect('/login?origin=cart')

    const parsedUrl = parse(req.url, true)

    return nextApp.render(req, res, '/cart', parsedUrl.query)
  })

  app.use('/cart', cartRouter);

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info(`Next.js is building...`)

      // @ts-ignore
      await nextBuild(path.join(__dirname, '../'))
      process.exit()
    })

    return
  }

  app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  )

  app.get('/api/faqs', (req, res) => {
    const parsedUrl = parse(req.url, true)
    return nextApp.render(req, res, '/api/faqs', parsedUrl.query)
  })

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info(`Next.js Started`);

    app.listen(PORT, async () => {
      payload.logger.info(`Next.js ready on ${process.env.NEXT_PUBLIC_SERVER_URL}`)
    })
  }); 
};

start();