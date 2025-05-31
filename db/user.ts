import { pool } from './db';

export const UserDB = {
   login: async (email: string, password: string) => {
     const res = await pool.query(
       "SELECT * FROM users WHERE email = $1 AND password = $2 LIMIT 1",
       [email, password]
     );
     return res.rows.length > 0 ? res.rows[0] as User : false;
   },
 
   getUser: async (email: string) => {
     const res = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
     return res.rows.length > 0 ? res.rows[0] as User : false;
   },

   insert: async (user: User) => {
     const res = await pool.query(
       "INSERT INTO users (userid, email) VALUES ($1, $2)",
       [user.userid, user.email]
     );
     return res.rowCount === 1;
   },
 };