import express from "express";

import { get, merge } from "lodash";

import { getUsersbySessionToken } from "../db/user";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["myDATABASE-AUTH"];
    if (!sessionToken) {
      return res.status(403);
    }
    const exisitingUser = await getUsersbySessionToken(sessionToken);
    if (!exisitingUser) {
      return res.sendStatus(403);
    }
    merge(req, { identity: exisitingUser });
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
