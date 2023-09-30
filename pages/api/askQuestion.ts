
import query from "@/lib/queryApi";
import { NextApiRequest, NextApiResponse } from "next";


import admin from "firebase-admin"
import { adminDb } from "@/firebaseAdmin";

type Data = {
    answer: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { prompt, chatId, session } = req.body

    if (!prompt) {
        res.status(400).json({ answer: "Please provide prompt!"})
        return
    }

    if (!chatId) {
        res.status(400).json({ answer: "Please provide a calid chatId!"})
        return
    }

    //Chat Gpt query
    const response = await query(prompt)

    console.log(response);
    const message: Message = {
        text: response || "ChatGPT was unable to find an answer for that!",
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: 'ChatGPT',
            name: 'ChatGPT',
            avatar: "https://i.ibb.co/Zg8WPLD/kisspng-royalty-free-medicine-5ae62d32c77f94-4581223115250342908172.png"
        }
    }

    await adminDb
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message)

    res.status(200).json({ answer: message.text })

}

