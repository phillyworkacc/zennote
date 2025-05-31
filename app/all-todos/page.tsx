import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AllTodosPage from "./AllTodos";
import { getAllUserTodos } from "../actions/todo";

export default async function AllTodo () {
   const session = await getServerSession(authOptions);
   if (!session?.user) redirect("/login");

   let userTodos = await getAllUserTodos();
   if (!userTodos) userTodos = [];

   return <AllTodosPage todos={userTodos} />
}
