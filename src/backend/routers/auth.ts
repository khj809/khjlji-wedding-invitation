import express from "express";
import fetch from "universal-fetch";

import { insertUser } from "../utils/graphql";
import { generateJWT } from "../utils/jwt";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { provider, accessToken } = req.body;
    let serviceId = null;
    let name = null;
    if (provider === "google") {
      const res = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const payload = await res.json();
      serviceId = payload.id;
      name = payload.name;
    } else if (provider === "facebook") {
      const res = await fetch("https://graph.facebook.com/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const payload = await res.json();
      serviceId = payload.id;
      name = payload.name;
    } else if (provider === "kakao") {
      const res = await fetch("https://kapi.kakao.com/v2/user/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const payload = await res.json();
      serviceId = String(payload.id);
      name = payload.properties.nickname;
    } else if (provider === "naver") {
      const res = await fetch("https://openapi.naver.com/v1/nid/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const payload = await res.json();
      serviceId = payload.response.id;
      name = payload.response.nickname;
    }

    if (!serviceId || !name) {
      throw new Error("serviceId or name is not recognized");
    }

    const key = Buffer.from(`${provider}${serviceId}`).toString("base64");

    const user = await insertUser({ name, provider, key });
    if (!user) {
      res.status(400).send("failed to insert user");
    }

    const jwt = generateJWT(user);

    res.send({ token: jwt, user });
  } catch (err) {
    console.log(err);
    res.status(400).send(String(err));
  }
});

export default router;
