import { config } from "dotenv";

config();

export const HASURA_GRAPHQL_ENDPOINT = process.env.HASURA_GRAPHQL_ENDPOINT;
export const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;
export const HASURA_JWT_SECRET_KEY = process.env.HASURA_JWT_SECRET_KEY;
export const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
export const TELEGRAM_DEFAULT_CHAT_ID = process.env.TELEGRAM_DEFAULT_CHAT_ID;
export const PORT = process.env.PORT || 3000;
