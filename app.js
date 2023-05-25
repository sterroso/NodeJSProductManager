import e from "express";
// Imports de librerías de terceros
import cors from "cors";

// Imports de configuración (código propio)
import appConfig from "./src/config/app.config.js";

//Imports de enrutadores (código propio)
import CategoriesRouter from "./src/routes/categories.router.js";
import ProductsRouter from "./src/routes/product.router.js";
import UtilsRouter from "./src/routes/utils.router.js";
import UsersRouter from "./src/routes/user.router.js";
import RolesRouter from "./src/routes/role.router.js";
import AuthRouter from "./src/routes/auth.router.js";

// Objeto app
const app = e();

// Configuración de middlewares.
app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: appConfig.cors.methods,
    preflightContinue: appConfig.cors.preflightContinue,
    optionsSuccessStatus: appConfig.cors.optionsSuccessStatus,
  })
);

// Configuración de enrutadores
app.use("/utils", UtilsRouter);
app.use("/api/categories", CategoriesRouter);
app.use("/api/products", ProductsRouter);
app.use("/api/users", UsersRouter);
app.use("/api/roles", RolesRouter);
app.use("/api/auth", AuthRouter);

// Exportación de la app
export default app;
