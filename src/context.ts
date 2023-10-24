import { logger } from "@bogeychan/elysia-logger";
import Elysia from "elysia";
import { db } from "./db";
import { HttpStatusCode } from "elysia-http-status-code";
import { httpError, httpErrorDecorator } from "elysia-http-error";
import pretty from "pino-pretty";

const stream = pretty({
  colorize: true,
});

export const context = new Elysia({ name: "context" })
  .use(logger({ level: "info", stream }))
  .use(HttpStatusCode())
  .use(httpError())
  .use(httpErrorDecorator)
  .decorate("db", db);
