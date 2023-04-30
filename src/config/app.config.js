import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  cors: {
    origins: [/localhost/gi, /127\.0\.0\.[0..9]{1,3}/g],
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionsSuccessStatus: 200,
    preflightContinue: false,
  },
};
