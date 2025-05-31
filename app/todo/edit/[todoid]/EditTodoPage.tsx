'use client'
import "@/styles/home.css"
import "@/styles/todo.css"
import { useState } from "react";
import { NavbarBack } from "@/components/Navbar/Navbar";
import { getCategoryEmoji, getPriorityColor } from "@/components/Todo/Todo";
import { titleCase } from "@/utils/str";
import { makeTodoChanges } from "@/app/actions/todo";
import TodoTextEditor from "./TodoTextEditor";

export default function EditTodoPage ({ todo }: { todo: Todo }) {
   const [todoInfo, setTodoInfo] = useState(todo);

   const updateTodoText = async (text: string) => {
      setTodoInfo((prev) => ({ ...prev, todo_text: text }))
      await makeTodoChanges({ ...todoInfo, todo_text: text });
   }

   return (
      <div className="homepage">
         <div className="homepage-container">
            <NavbarBack url='/all-todos' />
            <div className="text-xl bold-800 pd-1 pdx-1 mt-1">{todo.title}</div>

            <div className="todo-category-color text-xxs dfb align-center gap-5 pd-1 mb-1">
               <div className="category-tag">
                  <span>{getCategoryEmoji(todoInfo.category)}</span>
                  {titleCase(todoInfo.category)}
               </div>
               <div className="color-tag">
                  <div className={`color ${getPriorityColor(todoInfo.priority)}`}></div>
                  {titleCase(todoInfo.priority)}
               </div>
            </div>

            <TodoTextEditor 
               initialText={todoInfo.todo_text}
               onUpdate={(text) => updateTodoText(text)} 
            />
         </div>
      </div>
   )
}