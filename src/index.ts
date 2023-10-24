import { Elysia } from "elysia";
import { authRoute } from "./auth";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(cors({ origin: "*" }))
  .get("/", () => "Hello Elysia")
  .use(authRoute)
  .use(swagger({ path: "/swagger" }))
  .onStart(({ log }) => {
    if (log) {
      log.info("Server started");
    }
  })
  .onStop(({ log }) => {
    if (log) {
      log.info("Server stopped");
    }
  })
  .onRequest(({ log, request }) => {
    if (log) {
      log.debug(`Request received: ${request.method}: ${request.url}`);
    }
  })
  .onResponse(({ log, request }) => {
    if (log) {
      log.debug(`Response sent: ${request.method}: ${request.url}`);
    }
  })
  .onError(({ log, error }) => {
    if (log) {
      log.error(error);
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
