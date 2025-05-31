type User = {
   userid: string;
   email: string;
}

type TodoCategory = 'work' | 'personal' | 'school' | 'family' | 'friends' | 'other';
type TodoPriority = 'high' | 'medium' | 'low';
type Todo = {
   todoid: string;
   userid: string;
   title: string;
   todo_text: string;
   category: TodoCategory;
   priority: TodoPriority;
   completed: boolean;
   createdat: string;
   completedat: string;
}