'use client'
import "./Drawer.css"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { ReactNode } from 'react'

export default function Drawer({ children, onCloseAction }: { children: ReactNode, onCloseAction: Function }) {
   return (
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.1 }}
         className='drawer'
      >
         <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{
               duration: 0.1,
               ease: [0.07, 0.6, 0.43, 0.96]
            }}
            className="drawer-container"
         >
            <div className="close" onClick={() => onCloseAction()}><X size={24} /></div>
            {children}
         </motion.div>
      </motion.div>
   )
}
