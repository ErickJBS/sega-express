import * as express from "express";
import oracledb from "oracledb";
import { environment } from "../enviroments/enviroment";
import { Class } from "../models/class";
import { Kardex } from "../models/kardex";
import { Major } from "../models/major";
import { Student } from "../models/student";

class DatabaseController {
  public studentPath = "/student";
  public majorsPath = "/majors";
  public schedulePath = "/schedule";
  public kardexPath = "/kardex";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.studentPath, this.getStudent);
    this.router.get(this.majorsPath, this.getMajors);
    this.router.get(this.kardexPath, this.getKardex);
    this.router.get(this.schedulePath, this.getSchedule);
  }

  public async getStudent(request: express.Request, response: express.Response) {
    let connection;
    try {
      const id = request.query.id;
      connection = await oracledb.getConnection(environment.databaseConfig);
      const result = await connection.execute(
        `select matricula, nombre_estudiante, apellido_paterno,
        apellido_materno from estudiantes where matricula = :id`, [id],
      );
      const student = result.rows[0] as any;
      const tmp = new Student(
        student[0], student[1], student[2], student[3]
      );
      response.json(tmp);
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

  public async getMajors(request: express.Request, response: express.Response) {
    let connection;
    try {
      const id = request.query.id;
      connection = await oracledb.getConnection(environment.databaseConfig);
      const result = await connection.execute(
        `select f.nombre_carrera, g.nombre_facultad
        from estudiantes_carreras e
        join carreras f
          on f.carrera_id = e.carrera_id
        join facultades g
          on g.facultad_id = f.facultad_id
        where matricula = :id`, [id]
      );
      const tmp: Major[] = [];
      for (const major of result.rows) {
        const m = major as any;
        tmp.push(new Major(m[0], m[1]));
      }
      response.json(tmp);
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

  public async getKardex(request: express.Request, response: express.Response) {
    let connection;
    try {
      const id = request.query.id;
      connection = await oracledb.getConnection(environment.databaseConfig);
      const result = await connection.execute(
        `select b.semestre, b.nombre_materia, a.calificacion
        from kardex a
        join materias b
        on a.materia_id = b.materia_id
        where a.matricula = :id`, [id]
      );
      const tmp: Kardex[] = [];
      for (const kardex of result.rows) {
        const k = kardex as any;
        tmp.push(new Kardex(k[0], k[1], k[2]));
      }
      response.json(tmp);
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

  public async getSchedule(request: express.Request, response: express.Response) {
    let connection;
    try {
      const id = request.query.id;
      connection = await oracledb.getConnection(environment.databaseConfig);
      const result = await connection.execute(
        `select m.nombre_materia, c.salon_id, c.dia, c.hora, c.duracion
        from grupos_estudiantes ge
        join grupos g
        on g.grupo_id = ge.grupo_id
        join materias m
        on m.materia_id = g.materia_id
        join clases c
        on c.grupo_id = ge.grupo_id
        where matricula = :id`, [id]
      );
      const tmp: Class[] = [];
      for (const clss of result.rows) {
        const c = clss as any;
        tmp.push(new Class(c[0], c[1], c[2], c[3], c[4]));
      }
      response.json(tmp);
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
