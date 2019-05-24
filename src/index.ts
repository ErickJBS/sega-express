import App from "./app";
import AuthController from "./controllers/auth.controller";
import DatabaseController from "./controllers/database.controller";

const port = 8000; // default port to listen

const app = new App([
    DatabaseController,
    AuthController,
  ], port);

app.listen();
