import dotenv from "dotenv";

dotenv.config();

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24; // 24 hrs

export default {
  port: process.env.PORT,
  cors: {
    origins: [/localhost/gi, /127\.0\.0\.[0..9]{1,3}/g],
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionsSuccessStatus: 200,
    preflightContinue: false,
  },
  signedCookies: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    maxAge: COOKIE_MAX_AGE,
  },
};
