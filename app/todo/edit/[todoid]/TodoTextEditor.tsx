'use client'
import { useEffect, useState, useRef } from 'react';

type TodoEditorProps = {
   initialText: string;
   onUpdate: (text: string) => void;
};

export default function TodoTextEditor ({ initialText, onUpdate }: TodoEditorProps) {
   const [text, setText] = useState(initialText);
   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value;
      setText(newText);

      if (timeoutRef.current) {
         clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
         onUpdate(newText);
      }, 1000);
   };

   useEffect(() => {
      return () => {
         if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
   }, []);

   return (
      <textarea
         value={text}
         autoFocus
         onChange={handleChange}
         placeholder='Text...'
         className="edit-todo-textarea"
      />
   );
}
