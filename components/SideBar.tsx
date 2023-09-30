"use client"

import { collection, orderBy, query } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"
import { useSession, signOut } from "next-auth/react"
import NewChat from "./NewChat"
import { db } from "@/firebase"
import ChatRow from "./ChatRow"
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid"

const SideBar = () => {
    const { data: session } = useSession()

    const [chats, loading, error] = useCollection(
        session && query(
            collection(db, "users", session?.user?.email!, 'chats'),
            orderBy('createdAt', 'asc'))
    )
   
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
                onClick={() => signOut()}
                className="h-8 w-8 text-white cursor-pointer mx-auto mb-2 hover:opacity-50"
            />
        )}
    </div>
  )
}

export default SideBar