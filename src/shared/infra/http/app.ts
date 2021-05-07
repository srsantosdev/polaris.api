/* eslint-disable no-console */
import 'dotenv/config';

import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import '@shared/infra/postgres/Connection';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  (error: Error, _request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.error(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error.',
    });
  },
);

export default app;
