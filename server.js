import app from "./app.js";
import "./src/config/mongo.config.js";
import { PORT } from "./src/constants/app.constants.js";
import init from "./src/utils/init.js";

if (await init()) {
  const server = app.listen(PORT, (error) => {
    if (error) {
      console.error("🤯 An error occurred while trying to start the server!");
      console.error(error);
    }

    console.info(`🤖 Server up and listening on port ${PORT}!`);
  });

  server.on("error", (error) => {
    console.error("😰 An error occurred and the server stopped!");
    console.error(error);
  });
} else {
  console.error("Application datbase could not be initialized.");
  process.exit(1);
}
