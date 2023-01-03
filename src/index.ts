import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const passport = require("passport");
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
    }
  )
);
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile",'email'] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req: Request, res: Response) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
