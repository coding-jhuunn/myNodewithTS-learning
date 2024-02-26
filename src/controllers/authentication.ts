import express from "express";

import { getUsersbyEmail, createUser } from "db/user";
import { random, authentication } from "helpers";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(404);
    }
    const exisitingUser = await getUsersbyEmail(email);
    if (exisitingUser) {
      return res.sendStatus(400);
    }
    const salt = random();

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res.status(200).json(user).end();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};
