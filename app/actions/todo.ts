"use server"
import { TodoDB } from "@/db/todo";
import { UserDB } from "@/db/user";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function getAllUserTodos (): Promise<Todo[] | false> {
   try {
      const session = await getServerSession(authOptions);
      if (!session?.user) return false;

      const user = await UserDB.getUser(session.user.email!);
      if (!user) return false;

      const userTodos = await TodoDB.getUserTodos(user.userid);
      return userTodos;
   } catch (e) {
      return false;
   }
}

export async function createTodo (todo: Omit<Todo, 'userid'>): Promise<boolean> {
   try {
      const session = await getServerSession(authOptions);
      if (!session?.user) return false;

      const user = await UserDB.getUser(session.user.email!);
      if (!user) return false;

      return await TodoDB.insert({
         ...todo,
         userid: user.userid
      });
   } catch (e) {
      return false;
   }
}

export async function makeTodoChanges (todo: Todo): Promise<boolean> {
   try {
      return await TodoDB.update(todo);
   } catch (e) {
      return false;
   }
}

export async function deleteTodo (todoid: string, userid: string): Promise<boolean> {
   try {
      return await TodoDB.delete(todoid, userid);
   } catch (e) {
      return false;
   }
}