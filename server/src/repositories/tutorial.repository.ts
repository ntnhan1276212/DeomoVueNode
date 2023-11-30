import connection from "../db/index";
import Tutorial from "../models/tutorial.model";

interface ITutorialRepository {
  save(tutorial: Tutorial): Promise<Tutorial>;
  retrieveAll(searchParams: {title: string, published: boolean}): Promise<Tutorial[]>;
  retrieveById(tutorialId: number): Promise<Tutorial | undefined>;
  update(tutorial: Tutorial): Promise<number>;
  delete(tutorialId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class TutorialRepository implements ITutorialRepository {
  save(tutorial: Tutorial): Promise<Tutorial> {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO tutorials (title, description, published) VALUES(?,?,?)",
        [tutorial.title, tutorial.description, tutorial.published ? tutorial.published : false],
        (err: any, res: any) => {
          if (err) reject(err);
          else
            this.retrieveById(res.insertId)
              .then((tutorial) => resolve(tutorial!))
              .catch(reject);
        }
      );
    });
  }

  retrieveAll(searchParams: {title?: string, published?: boolean}): Promise<Tutorial[]> {
    let query: string = "SELECT * FROM tutorials";
    let condition: string = "";
  
    if (searchParams?.published)
      condition += "published = TRUE"
  
    if (searchParams?.title)
      condition += `LOWER(title) LIKE '%${searchParams.title}%'`
  
    if (condition.length)
      query += " WHERE " + condition;
  
    return new Promise((resolve, reject) => {
      connection.query<Tutorial[]>(query, (err: any, res: any) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(tutorialId: number): Promise<Tutorial> {
    return new Promise((resolve, reject) => {
      connection.query<Tutorial[]>(
        "SELECT * FROM tutorials WHERE id = ?",
        [tutorialId],
        (err: any, res: any) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  update(tutorial: Tutorial): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
        [tutorial.title, tutorial.description, tutorial.published, tutorial.id],
        (err: any, res: any) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  delete(tutorialId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM tutorials WHERE id = ?",
        [tutorialId],
        (err: any, res: any) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM tutorials", (err: any, res: any) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default new TutorialRepository();