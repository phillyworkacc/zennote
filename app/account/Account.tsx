'use client'
import { useSession } from 'next-auth/react';

export default function AccountPage () {
   const { data: session } = useSession();
   
   return (
      <div className='homepage'>
         <div className="homepage-container">
            <div className="text-l bold-600 pd-1">Account Settings</div>
            {session?.user?.name}
            {session?.user?.email}
            {session?.user?.image}
         </div>
      </div>
   )
}
