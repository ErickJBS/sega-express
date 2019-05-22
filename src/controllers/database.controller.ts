import * as express from "express";
import oracledb from "oracledb";
import { environment } from "../enviroments/enviroment";

class DatabaseController {
  public path = "/alumno";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getStudent);
  }

  // async getStudent(studentId: string) {
  public async getStudent(request: express.Request, response: express.Response) {
    let connection;
    try {
      // tslint:disable-next-line:no-console
      console.log(request);
      connection = await oracledb.getConnection(environment.databaseConfig);
      const result = await connection.execute(
        "select * from estudiantes where matricula = :id", ["a311008"]
      );
      response.send(result.rows[0]);
      // console.log(result.rows[0]);
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log("Something went wrong!", error);
    } finally {
      if (connection) {
        // conn assignment worked, need to close
        await connection.close();
      }
    }
  }

}

export default new DatabaseController();
