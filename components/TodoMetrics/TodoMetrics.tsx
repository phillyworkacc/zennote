'use client'
import "./TodoMetrics.css"

export default function TodoMetrics ({ todos }: { todos: Todo[] }) {
   function calculateAverage (todos: Todo[]) {
      const completedTodos = todos.filter(todo => todo.completed && todo.completedat && todo.createdat);

      if (completedTodos.length === 0) return '0';

      const totalTimeMs  = completedTodos.reduce((acc, todo) => {
         const created = new Date(parseInt(todo.createdat)).getTime();
         const completed = new Date(parseInt(todo.completedat)).getTime();
         return acc + (completed - created);
      }, 0);

      const avgMs = totalTimeMs / completedTodos.length;
      const avgHours = avgMs / (1000 * 60 * 60);
      return avgHours.toFixed(2);
   }

   function getCompletionTier (hours: number) {
      if (hours < 6) return { color: 'green' };
      if (hours <= 24) return { color: 'orange' };
      return { color: 'red' };
   }

   return (
      <div className='todo-metrics'>
         <div className="text-xxb text-center bold-700 pd-05">{todos.filter((todo) => todo.completed == false).length}</div>
         <div className="text-xxxs text-center grey-3 mb-1">undone todo{todos.filter((todo) => todo.completed == false).length > 1 && 's'}</div>

         <div className="tags">
            <div className="tag">
               <div className="color green"></div>
               <span className="text-xxxs fit">
                  {todos.filter((todo) => todo.completed == true).length} completed todo{todos.filter((todo) => todo.completed == true).length > 1 && 's'}
               </span>
            </div>
            <div className="tag">
               <div className={`color ${getCompletionTier(parseInt(calculateAverage(todos))).color}`}></div>
               <span className="text-xxxs fit">{calculateAverage(todos)}h completion rate</span>
            </div>
         </div>
      </div>
   )
}
