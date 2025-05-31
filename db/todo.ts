import { pool } from './db';

export const TodoDB = {
  getUserTodos: async (userId: string) => {
    const res = await pool.query("SELECT * FROM todo WHERE userid = $1 ORDER BY id DESC", [userId]);
    return res.rows as Todo[];
  },

  getTodo: async (todoId: string) => {
    const res = await pool.query("SELECT * FROM todo WHERE todoid = $1", [todoId]);
    return res.rows.length > 0 ? res.rows[0] as Todo : false;
  },

  insert: async (todo: Todo) => {
    const res = await pool.query(
      "INSERT INTO todo (todoid,userid,title,todo_text,category,priority,completed,createdAt,completedAt) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [ 
        todo.todoid, todo.userid, todo.title, todo.todo_text, todo.category,
        todo.priority, todo.completed, todo.createdat, todo.completedat
      ]
    );
    return res.rowCount === 1;
  },

  update: async (todo: Todo) => {
    const res = await pool.query(
      "UPDATE todo SET userid = $1,title = $2,todo_text = $3,category = $4,priority = $5,completed = $6,createdAt = $7,completedAt = $8 WHERE todoid = $9",
      [ 
        todo.userid, todo.title, todo.todo_text, todo.category, todo.priority,
        todo.completed, todo.createdat, todo.completedat, todo.todoid
      ]
    );
    return res.rowCount === 1;
  },

  delete: async (todoId: string, userid: string) => {
    const res = await pool.query("DELETE FROM todo WHERE todoid = $1 AND userid = $2", [todoId, userid]);
    return res.rowCount === 1;
  }
};
