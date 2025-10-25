import * as SQLite from "expo-sqlite";

export const db = (SQLite as any).openDatabase("tasks.db");

export const initDB = () => {
  db.transaction((tx: any) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        done INTEGER NOT NULL DEFAULT 0
      );`,
      [],
      () => console.log("Table created or exists"),
      (_: any, error: any) => {
        console.log("Error creating table", error);
        return false;
      }
    );
  });
};

export const insertTask = (name: string, callback?: () => void) => {
  db.transaction((tx: any) => {
    tx.executeSql(
      "INSERT INTO tasks (name, done) VALUES (?, 0);",
      [name],
      () => callback?.(),
      (_: any, error: any) => {
        console.log("Insert failed", error);
        return false;
      }
    );
  });
};

export const updateTask = (id: number, name: string, done: boolean, callback?: () => void) => {
  db.transaction((tx: any) => {
    tx.executeSql(
      "UPDATE tasks SET name = ?, done = ? WHERE id = ?;",
      [name, done ? 1 : 0, id],
      () => callback?.(),
      (_: any, error: any) => {
        console.log("Update failed", error);
        return false;
      }
    );
  });
};

export const deleteTask = (id: number, callback?: () => void) => {
  db.transaction((tx: any) => {
    tx.executeSql(
      "DELETE FROM tasks WHERE id = ?;",
      [id],
      () => callback?.(),
      (_: any, error: any) => {
        console.log("Delete failed", error);
        return false;
      }
    );
  });
};

export const fetchTasks = (callback: (tasks: any[]) => void) => {
  db.transaction((tx: any) => {
    tx.executeSql(
      "SELECT * FROM tasks;",
      [],
      (_: any, result: any) => {
        const tasks = [];
        for (let i = 0; i < result.rows.length; i++) {
          tasks.push(result.rows.item(i));
        }
        callback(tasks);
      },
      (_: any, error: any) => {
        console.log("Fetch failed", error);
        return false;
      }
    );
  });
};
