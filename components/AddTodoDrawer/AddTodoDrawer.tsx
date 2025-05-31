'use client'
import { titleCase } from '@/utils/str'
import { useState } from 'react'
import { getCategoryEmoji, getPriorityColor } from '../Todo/Todo'
import { Plus } from 'lucide-react'
import { createTodo } from '@/app/actions/todo'
import { toast } from 'sonner'
import { categories, priorities } from '@/utils/constants'
import { useTransitionRouter } from 'next-view-transitions'
import { pageAnimation } from '@/utils/PageAnimations'

export default function AddTodoDrawer({ closeAction }: { closeAction: (todo: Todo) => void }) {
   const router = useTransitionRouter();
   const [title, setTitle] = useState("")
   const [addTodoCategoryIndex, setAddTodoCategoryIndex] = useState(0)
   const [addTodoPriorityIndex, setAddTodoPriorityIndex] = useState(0)

   const addTodoBtn = async () => {
      if (title == "") {
         toast.success("Please enter a title for your todo");
         return;
      }
      const todoId = crypto.randomUUID()
      const response = await createTodo({
         todoid: todoId,
         title: title,
         todo_text: '',
         category: categories[addTodoCategoryIndex],
         priority: priorities[addTodoPriorityIndex],
         completed: false,
         createdat: `${Date.now()}`,
         completedat: ''
      })
      if (response) {
         toast.success("Todo created !");
         closeAction({
            todoid: todoId,
            title: title,
            todo_text: '',
            category: categories[addTodoCategoryIndex],
            priority: priorities[addTodoPriorityIndex],
            completed: false,
            createdat: `${Date.now()}`,
            completedat: '',
            userid: ''
         });
         router.push(`/todo/edit/${todoId}`, {
            onTransitionReady: pageAnimation
         });
      } else {
         toast.success("Failed to add todo");
      }
   }
   
   return (<>
      <div className="text-l bold-700 pd-1">Add Todo</div>
      <div className="text-xxs pd-1 grey-3">Fill the fields below to create a todo</div>
      
      <div className="text-s pd-1 mt-1">
         <input type="text" autoFocus className="full xs" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="text-xxs pd-15 bold-600">Choose Category</div>
      <div className="category text-xs dfb align-center gap-5 wrap">
         {categories.map((category, index) => {
            return <div 
               key={index} 
               className={`category-tag ${(index == addTodoCategoryIndex) && 'selected'}`}
               onClick={() => setAddTodoCategoryIndex(index)}
            >
               <span>{getCategoryEmoji(category)}</span>
               <span>{titleCase(category)}</span> 
            </div>
         })}
      </div>
      
      <div className="text-xxs pd-15 bold-600 mt-2">Choose Priority</div>
      <div className="category text-xs dfb align-center gap-5 wrap">
         {priorities.map((priority, index) => {
            return <div 
               key={index} 
               className={`color-tag ${(index == addTodoPriorityIndex) && 'selected'}`}
               onClick={() => setAddTodoPriorityIndex(index)}
            >
               <div className={`color ${getPriorityColor(priority)}`}></div>
               <span>{titleCase(priority)}</span> 
            </div>
         })}
      </div>

      <div className="text-xxs pd-15 bold-600 mt-2">
         <button className="full xxs" onClick={addTodoBtn}><Plus size={17} /> Add Todo</button>
      </div>
   </>)
}
