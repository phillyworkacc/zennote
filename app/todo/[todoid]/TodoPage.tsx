'use client'
import "@/styles/home.css"
import "@/styles/todo.css"
import { useState } from "react";
import { NavbarBack } from "@/components/Navbar/Navbar";
import { CircleCheck, Copy, Edit, Trash2 } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { deleteTodo, makeTodoChanges } from "@/app/actions/todo";
import { toast } from "sonner";
import { pageHomeAnimation } from "@/utils/PageAnimations";

export default function TodoPage ({ todo }: { todo: Todo }) {
   const router = useTransitionRouter();
   const [todoInfo, setTodoInfo] = useState(todo);

   const markTodoAsComplete = async () => {
      setTodoInfo((prev) => ({ ...prev, completed: true, completedat: `${Date.now()}` }))
      const res = await makeTodoChanges({ ...todoInfo, completed: true, completedat: `${Date.now()}` });
      if (res) toast.success("Todo is complete")
   }

   const deleteTodoBtn = async () => {
      const res = await deleteTodo(todoInfo.todoid, todoInfo.userid);
      if (res) {
         toast.success("Todo Deleted");
         router.push("/all-todos", {
            onTransitionReady: pageHomeAnimation
         })
      }
   }

   function copyToClipboard(text: string): void {
      if (navigator.clipboard && window.isSecureContext) {
         // Preferred method for modern browsers
         navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
      } else {
         // Fallback for iOS/Safari
         fallbackCopy(text);
      }
   }

   function fallbackCopy(text: string) {
      const textarea = document.createElement('textarea');
      textarea.value = text;

      // Prevent scrolling to bottom on iOS
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '0';
      textarea.style.opacity = '0';

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      try {
         document.execCommand('copy');
      } catch (err) {
         console.warn('Fallback: Copy failed', err);
      }

      document.body.removeChild(textarea);
   }

   const copyTodoText = () => {
      try {
         copyToClipboard(todo.todo_text);
         toast.success("Copied");
      } catch (e) {}
   }

   return (
      <div className="homepage">
         <div className="homepage-container">
            <NavbarBack url='/all-todos' />
            <div className="text-xl bold-800 pd-1 pdx-1 mt-1">{todo.title}</div>
            <div className="text-xxxs pd-05 pdx-1 lh-8 grey-2 whitespace-pre-wrap">
               {todo.todo_text == "" ? 'Nothing yet' : todo.todo_text}
            </div>

            {!todoInfo.completed && <div className="todo-action-buttons">
               <button className="complete full xxs" onClick={markTodoAsComplete}><CircleCheck size={18} /> Complete</button>
            </div>}

            <div className="todo-action-buttons">
               {!todoInfo.completed && <button className="full grey xxs color-edit" onClick={() => {
                  router.push(`/todo/edit/${todoInfo.todoid}`)
               }}>
                  <Edit size={20} />
                  <span>Edit</span>
               </button>}

               <button className="full grey xxs color-copy" onClick={copyTodoText}>
                  <Copy size={20} />
                  <span>Copy</span>
               </button>

               <button className="full grey xxs color-delete" onClick={deleteTodoBtn}>
                  <Trash2 size={20} />
                  <span>Delete</span>
               </button>
            </div>
         </div>
      </div>
   )
}