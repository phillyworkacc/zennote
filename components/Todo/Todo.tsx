'use client'
import "./Todo.css"
import { pageAnimation } from "@/utils/PageAnimations";
import { formatTimeAgo } from "@/utils/DateFormats";
import { titleCase } from "@/utils/str"
import { Check } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";

export function getCategoryEmoji(category: TodoCategory): string {
   const emojiMap: Record<typeof category, string> = {
      work: '🧑‍💻',
      personal: '🧘',
      school: '📚',
      family: '👨‍👩‍👧‍👦',
      friends: '🧑‍🤝‍🧑',
      other: '🗂️',
   };
   return emojiMap[category];
}

export function getPriorityColor(priority: TodoPriority): string {
   const colorMap: Record<typeof priority, string> = {
      high: 'red',
      medium: 'orange',
      low: 'green'
   };
   return colorMap[priority];
}

export default function Todo({ todo }: { todo: Todo }) {
   const router = useTransitionRouter();

   return (
      <div className="todo" onClick={() => router.push(`/todo/${todo.todoid}`, {
         onTransitionReady: pageAnimation
      })}>
         <div className="text-xs bold-700">{todo.title}</div>
         <div className="todo-text text-xxxs grey-4">
            {(todo.todo_text == "") && 'Nothing yet'}
            {(todo.todo_text !== "") && `${todo.todo_text.substring(0,30)}...`}
         </div>
         <div className="category">
            <div className="category-tag">
               <span>{getCategoryEmoji(todo.category)}</span>
               <span>{titleCase(todo.category)}</span> 
            </div>
            <div className="color-tag">
               <div className={`color ${getPriorityColor(todo.priority)}`}></div>
               <span>{titleCase(todo.priority)}</span>
            </div>
         </div>
         {todo.completed && <>
            <div className="category">
               <div className="color-tag">
                  <div className="color green"><Check size={12} /></div>
                  <span>Completed</span>
               </div>
            </div>
         </>}
         <div className="time">
            <div className="text-xxxs fit grey-4">
               {todo.completed ? <>
                  completed {formatTimeAgo(parseInt(todo.completedat))}
               </> : <>
                  added {formatTimeAgo(parseInt(todo.createdat))}
               </>}
            </div>
         </div>
      </div>
   )
}
