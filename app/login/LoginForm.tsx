'use client'
import "@/styles/auth.css"
import { InterFont } from "../fonts"
import { Lock } from "lucide-react"
import { GoogleIcon, ZennoteRawLogo } from "@/components/Icons/Icon"
import { signIn } from "next-auth/react"

export default function LoginForm () {
   return (
      <div className='auth'>
         <div className="auth-box">
            <div className="text-xl bold-700 pd-05 text-center">
               <ZennoteRawLogo size={50} />
            </div>
            <div className="text-xl bold-700 pd-1 text-center">Login or Sign Up</div>
            <div className="text-s pd-2 text-center dfb justify-center">
               <button className="grey xs" onClick={() => signIn("google")}>
                  <GoogleIcon size={20} /> Continue with Google
               </button>
            </div>
            <div className="text-xxxs grey-3 pd-1 dfb justify-center align-center gap-8">
               <Lock size={14} />
               Powered and Secured by minweb
            </div>
         </div>
      </div>
   )
}
