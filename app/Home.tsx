'use client'
import "@/styles/home.css"
import { useSession } from 'next-auth/react'
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import TodoMetrics from "@/components/TodoMetrics/TodoMetrics";
import Todo from "@/components/Todo/Todo";
import Drawer from "@/components/Drawer/Drawer";
import AccountDrawer from "@/components/AccountDrawer/AccountDrawer";
import AddTodoDrawer from "@/components/AddTodoDrawer/AddTodoDrawer";
import { getAllUserTodos } from "./actions/todo";
import { toast } from "sonner";
import { useTransitionRouter } from "next-view-transitions";
import { pageAnimation } from "@/utils/PageAnimations";

export default function HomePage () {
   const router = useTransitionRouter();
   const [showAddTodoDrawer, setShowAddTodoDrawer] = useState(false);
   const [showAccountDrawer, setShowAccountDrawer] = useState(false);
   const [todos, setTodos] = useState<Todo[]>([])

   const loadAllTodos = async () => {
      const userTodos = await getAllUserTodos();
      setTodos(userTodos ? userTodos : []);
      if (!userTodos) toast.error("Failed to load all user todos")
   }

   useEffect(() => {
      loadAllTodos();
   }, [])

   return (
      <div className="homepage">
         <div className="homepage-container">

            <Navbar onAccountClick={() => setShowAccountDrawer(true)} onAddTodoClick={() => setShowAddTodoDrawer(true)} />
            <TodoMetrics todos={todos} />

            <div className="text-xs dfb justify-center pdx-1 pd-1">
               <button 
                  className="outline-black full"
                  onClick={() => {
                     router.push("/all-todos", {
                        onTransitionReady: pageAnimation
                     })
               }}>View All Todos</button>
            </div>

            <div className="todos-list">
               {todos
               .filter(todo => todo.completed == false)
               .slice(0,3)
               .map((todo, index) => {
                  return <Todo key={index} todo={todo} />
               })}
            </div>

            {showAddTodoDrawer && <Drawer onCloseAction={() => setShowAddTodoDrawer(false)}>
               <AddTodoDrawer closeAction={(todo) => {
                  setTodos((prev) => [ todo, ...prev ])
                  setShowAddTodoDrawer(false)
               }} />
            </Drawer>}
            
            {showAccountDrawer && <Drawer onCloseAction={() => setShowAccountDrawer(false)}>
               <AccountDrawer />
            </Drawer>}

         </div>
      </div>
   )
}