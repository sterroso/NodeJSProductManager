import e from "express";
// Imports de librerías de terceros
import cors from "cors";

// Imports de configuración (código propio)
import appConfig from "./src/config/app.config.js";

//Imports de enrutadores (código propio)
import UtilsRouter from "./src/routes/utils.router.js";

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

// Exportación de la app
export default app;
