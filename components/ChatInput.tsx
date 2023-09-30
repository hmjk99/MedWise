'use client'

import { db } from "@/firebase"
import { PaperAirplaneIcon } from "@heroicons/react/20/solid"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"
import { toast } from "react-hot-toast"

type Props = {
    chatId: string
}

const ChatInput = ({ chatId }: Props) => {
    const [prompt, setPrompt] = useState("")
    const { data: session } = useSession()

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!prompt) return;

        const input = prompt.trim()
        setPrompt("")

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`
            }
        }

        await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), message)


        const notification = toast.loading("MedWise is thinking...")
        const requestBody = {
            prompt: input, // Make sure 'input' is defined and has a value
            chatId, // Make sure 'chatId' is defined and has a value
            session // Make sure 'session' is defined and has a value
        };


        await fetch('/api/askQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Ensure this header is set
            },
            body: JSON.stringify(requestBody)
        }).then(() => {
            toast.success("MedWise has responded!", {
                id: notification,
            })
        })
    }

  return (
    <div className="bg-white/90 text-gray-800 rounded-lg mx-2 text-sm focus:outline-none">
        <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
            <input 
            className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
            disabled={!session}
            value={prompt} 
            onChange={e => setPrompt(e.target.value)}
            type="text" 
            placeholder="Type your message here..."/>

            <button
                disabled={!prompt || !session} 
                className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                type="submit">
                <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
            </button>
        </form>
    </div>
  )
}

export default ChatInput