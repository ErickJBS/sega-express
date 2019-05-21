import App from "./app";
import DatabaseController from "./controllers/database.controller";

const port = 8000; // default port to listen

const app = new App([
  DatabaseController
  ], port);

app.listen();
