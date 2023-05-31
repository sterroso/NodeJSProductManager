// Imports de librerías de terceros
import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Imports de configuración (código propio)
import appConfig from "./src/config/app.config.js";

//Imports de enrutadores (código propio)
import CategoriesRouter from "./src/routes/categories.router.js";
import ProductsRouter from "./src/routes/product.router.js";
import UtilsRouter from "./src/routes/utils.router.js";
import UsersRouter from "./src/routes/user.router.js";
import RolesRouter from "./src/routes/role.router.js";
import SessionRouter from "./src/routes/session.router.js";

// Imports de middlewares
import httpLogger from "./src/middlewares/httpLogger.middelware.js";
import errorLogger from "./src/middlewares/errorLogger.middleware.js";

// Objeto app
const app = e();

// Configuración de middlewares.
app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(cookieParser(appConfig.signedCookies.secret));
app.use(
  cors({
    origin: "*",
    methods: appConfig.cors.methods,
    preflightContinue: appConfig.cors.preflightContinue,
    optionsSuccessStatus: appConfig.cors.optionsSuccessStatus,
  })
);

// Http logger
app.use(httpLogger);

// Configuración de enrutadores
app.use("/utils", UtilsRouter);
app.use("/api/categories", CategoriesRouter);
app.use("/api/products", ProductsRouter);
app.use("/api/users", UsersRouter);
app.use("/api/roles", RolesRouter);
app.use("/api/session", SessionRouter);

// Error catching logger
app.use(errorLogger);

// Exportación de la app
export default app;
