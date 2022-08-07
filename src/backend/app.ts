import express from "express";
import proxy from "express-http-proxy";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./routers/auth";
import telegramRouter from "./routers/telegram";
import { PORT } from "./config";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  "/api/graphql",
  proxy(process.env.HASURA_GRAPHQL_ENDPOINT, {
    proxyReqPathResolver: req => {
      return "/v1/graphql";
    }
  })
);
app.use("/api/auth", authRouter);
app.use("/api/telegram", telegramRouter);

if (import.meta.env.PROD) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use(express.static(path.join(__dirname, "./static"), { extensions: ["html"] }));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./static/index.html"));
  });

  app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
  });
}

export const viteNodeApp = app;
