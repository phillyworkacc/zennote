'use client'
import { LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

export default function AccountDrawer() {
   const { data: session } = useSession();

   return (<>
      <div className="text-l bold-700 pd-1">Your Account</div>
      <div className="text-s pd-1 grey-3">{session?.user?.name}</div>
      <div className="text-s grey-3">{session?.user?.email}</div>
      <div className="text-s pd-3">
         <button className='outline-black xs full' onClick={() => signOut()}><LogOut size={17} /> Sign Out</button>
      </div>
   </>)
}
