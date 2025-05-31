import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { TodoDB } from "@/db/todo";
import TodoPage from "./TodoPage";
import Link from "next/link";

type TodoProps = {
   params: Promise<{
      todoid: string;
   }>
}

export default async function Todo ({ params }: TodoProps) {
   const { todoid } = await params;
   const session = await getServerSession(authOptions);
   if (!session?.user) redirect("/login");

   const todo = await TodoDB.getTodo(todoid);
   if (!todo) return <>
      <div className="text-xl">Todo does not exist</div>
      <Link href={'/'}>Go to home</Link>
   </>

   return <TodoPage todo={todo} />
}