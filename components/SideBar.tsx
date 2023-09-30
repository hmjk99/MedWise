"use client"

import { collection, orderBy, query } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"
import { useSession, signOut } from "next-auth/react"
import NewChat from "./NewChat"
import { db } from "@/firebase"
import ChatRow from "./ChatRow"
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next/navigation"

const SideBar = () => {
    const { data: session } = useSession()
    const router = useRouter()

    const [chats, loading, error] = useCollection(
        session && query(
            collection(db, "users", session?.user?.email!, 'chats'),
            orderBy('createdAt', 'asc'))
    )

    const logout = () => {
        console.log('Before router.push');
        router.push('/');
        console.log('After router.push');
        signOut();
      };
   
  return (
    <div className="p-2 flex flex-col h-screen">
        <div className="flex-1">
            <div>
                <NewChat/>

                {/* Map Through ChatRows */}
                {chats?.docs.map(chat => (
                    <ChatRow key={chat.id} id={chat.id} />
                ))}
            </div>
            
        </div>

        {session && (
            <ArrowLeftOnRectangleIcon
                onClick={logout}
                className="h-8 w-8 text-white cursor-pointer mx-auto mb-2 hover:opacity-50"
            />
        )}
    </div>
  )
}

export default SideBar