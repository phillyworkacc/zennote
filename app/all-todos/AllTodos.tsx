'use client'
import "@/styles/home.css"
import { useEffect, useState } from 'react';
import { NavbarToHome } from '@/components/Navbar/Navbar'
import { categories, priorities } from "@/utils/constants";
import { titleCase } from "@/utils/str";
import { Check, Square, SquareCheck, SquareX, X } from "lucide-react";
import Todo, { getCategoryEmoji, getPriorityColor } from '@/components/Todo/Todo'
import AddTodoDrawer from '@/components/AddTodoDrawer/AddTodoDrawer';
import Drawer from '@/components/Drawer/Drawer';
import Selector from "@/components/Selector/Selector";

export default function AllTodosPage ({ todos }: { todos: Todo[] }) {
   const [showAddTodoDrawer, setShowAddTodoDrawer] = useState(false);
   const [userTodos, setUserTodos] = useState(todos)

   const categoriesOptions = categories.map((category) => {
      return {
         content: <>{getCategoryEmoji(category)} {titleCase(category)}</>,
         value: category
      }
   })
   const prioritiesOptions = priorities.map((priority) => {
      return {
         content: <>
            <div className="text-xxxs fit dfb align-center gap-4">
               <Square size={13} color={getPriorityColor(priority)} fill={getPriorityColor(priority)} />
               {titleCase(priority)}
            </div>   
         </>,
         value: priority
      }
   })
   const completedOptions = [
      { content: 'Completed', value: '' },
      {
         content: <>
            <div className="completed-color-tag text-xxxs fit dfb align-center gap-4">
               <div className="color green text-xxs dfb align-center justify-center">
                  <Check size={13} />
               </div>
               Completed
            </div>
         </>,
         value: true
      },
      {
         content: <>
            <div className="completed-color-tag text-xxxs fit dfb align-center gap-4">
               <div className="color red">
                  <X size={13} fill="#fff" />
               </div>
               Undone
            </div>
         </>,
         value: false
      },
   ]

   const [search, setSearch] = useState("")
   const [filterCategory, setFilterCategory] = useState<TodoCategory | ''>("")
   const [filterPriority, setFilterPriority] = useState<TodoPriority | ''>("")
   const [filterCompleted, setFilterCompleted] = useState<boolean | ''>("")
   const [filteredTodos, setFilteredTodos] = useState(userTodos)

   useEffect(() => {
      const newFilteredTodos = userTodos
      .filter((todo) => (todo.title.toLowerCase().includes(search.toLowerCase()) || todo.todo_text.toLowerCase().includes(search.toLowerCase())))
      .filter((todo) => {
         // category filter
         if (filterCategory !== '') return (todo.category == filterCategory);
         return true
      })
      .filter((todo) => {
         // priority filter
         if (filterPriority !== '') return (todo.priority == filterPriority);
         return true
      })
      .filter((todo) => {
         // completion filter
         if (filterCompleted !== '') return (todo.completed == filterCompleted);
         return true
      })
      setFilteredTodos((prev) => [...newFilteredTodos])
   }, [search, filterCategory, filterPriority, filterCompleted, userTodos])
   
   return (
      <div className="homepage">
         <div className="homepage-container">

            <NavbarToHome onAddTodoClick={() => setShowAddTodoDrawer(true)} />

            <div className="text-l bold-800 pd-1 pdx-1 mt-1">All Todos</div>

            <div className="filters text-xs pd-1 pdx-1 full list">
               <input type="text" className="xs full" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
               <div className="text-xs dfb gap-5 align-center">
                  <Selector
                     options={[{ content: 'Category', value: '' }, ...categoriesOptions]}
                     onSelect={(val) => setFilterCategory(val)}
                  />
                  <Selector
                     options={[{ content: 'Priority', value: '' }, ...prioritiesOptions]}
                     onSelect={(val) => setFilterPriority(val)}
                  />
               </div>
               <div className="text-xs dfb gap-5 align-center">
                  <Selector
                     options={[...completedOptions]}
                     onSelect={(val) => setFilterCompleted(val)}
                  />
               </div>
            </div>

            <div className="todos-list">
               {(filteredTodos.length > 0) ? <>
                  {filteredTodos.map((todo, index) => {
                     return <Todo key={index} todo={todo} />
                  })}
               </> : <>
                  <div className="text-xxs text-center full grey-4">
                     No todos found
                  </div>
               </>}
            </div>

            {showAddTodoDrawer && <Drawer onCloseAction={() => setShowAddTodoDrawer(false)}>
               <AddTodoDrawer closeAction={(todo) => {
                  setUserTodos((prev) => [ todo, ...prev ])
                  setShowAddTodoDrawer(false)
               }} />
            </Drawer>}

         </div>
      </div>
   )
}
