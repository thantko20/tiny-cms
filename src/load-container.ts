import Container from "typedi";
import { db, dbToken } from "./database/knex-db";
import {
  httpLoggerMiddleware,
  httpMiddlewareToken
} from "./middlewares/http-logger.middleware";

export const loadContainer = () => {
  Container.set(dbToken, db);
  Container.set(httpMiddlewareToken, httpLoggerMiddleware);
};
