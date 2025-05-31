'use client'
import './Selector.css'
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type SelectProps = {
   options: {
      value: any;
      content: any;
   }[];
   onSelect: (value: any) => void;
};

export default function Selector ({ options, onSelect }: SelectProps) {
   const [isOpen, setIsOpen] = useState(false);
   const [selected, setSelected] = useState(options[0]);

   const handleSelect = (option: any) => {
      setSelected(option);
      onSelect(option.value);
      setIsOpen(false);
   };

   return (
      <div className="select-container">
         <button className="select-button" onClick={() => setIsOpen(!isOpen)}>
            <span>{selected.content}</span>
            <ChevronDown size={17} />
         </button>

         {isOpen && (
            <div className="select-dropdown">
               {options.map((option, index) => (
                  <div
                     key={index}
                     className="select-option"
                     onClick={() => handleSelect(option)}
                  >{option.content}</div>
               ))}
            </div>
         )}
      </div>
   );
}
