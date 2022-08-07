import jwt from "jsonwebtoken";
import { HASURA_JWT_SECRET_KEY } from "../config";

const generateJWT = (user: { id: string; name: string; provider: string; key: string }) => {
  const payload = {
    sub: user.id,
    name: user.name,
    user: {
      provider: user.provider,
      key: user.key
    }
  };
  return jwt.sign(payload, HASURA_JWT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "24h"
  });
};

export { generateJWT };
