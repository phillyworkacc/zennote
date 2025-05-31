'use client'
import { pageHomeAnimation } from "@/utils/PageAnimations";
import "./Navbar.css"
import { ArrowLeft, CircleUser, Home, Plus } from "lucide-react"
import { useSession } from "next-auth/react";
import { useTransitionRouter } from "next-view-transitions";

export default function Navbar ({ onAccountClick, onAddTodoClick }: { onAccountClick: Function, onAddTodoClick: Function }) {
   const { data: session } = useSession();

   return (
      <div className="navbar">
         <div className="account" onClick={() => onAccountClick()}>
            <CircleUser size={24} color="#FF7D46" />
         </div>
         <div className="user">{session?.user?.name}</div>
         <div className="add-todo" onClick={() => onAddTodoClick()}>
            <Plus size={24} color="#FF7D46" />
         </div>
      </div>
   )
}

export function NavbarToHome ({ onAddTodoClick }: { onAddTodoClick: Function }) {
   const { data: session } = useSession();
   const router = useTransitionRouter();

   return (
      <div className="navbar">
         <div className="account" onClick={() => {
            router.push("/", {
               onTransitionReady: pageHomeAnimation
            })
         }}>
            <Home size={24} color="#FF7D46" />
         </div>
         <div className="user">{session?.user?.name}</div>
         <div className="add-todo" onClick={() => onAddTodoClick()}>
            <Plus size={24} color="#FF7D46" />
         </div>
      </div>
   )
}

export function NavbarToHomeOnly () {
   const { data: session } = useSession();
   const router = useTransitionRouter();

   return (
      <div className="navbar">
         <div className="account" onClick={() => {
            router.push("/", {
               onTransitionReady: pageHomeAnimation
            })
         }}>
            <Home size={24} color="#FF7D46" />
         </div>
         <div className="user">{session?.user?.name}</div>
         <div className="add-todo"></div>
      </div>
   )
}

export function NavbarBack ({ url }: { url: string }) {
   const { data: session } = useSession();
   const router = useTransitionRouter();

   return (
      <div className="navbar">
         <div className="account" onClick={() => {
            router.push(url, {
               onTransitionReady: pageHomeAnimation
            })
         }}>
            <ArrowLeft size={24} />
         </div>
         <div className="user">{session?.user?.name}</div>
         <div className="add-todo"></div>
      </div>
   )
}
