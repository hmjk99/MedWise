import openai from "./chatgpt";

const query = async (prompt: string) => {
    const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: "You are a knowledgeable AI pharmaceutical assistant. You are designed to provide accurate information on topics related to medicine. If the user asks about different subjects, respond with, 'I don\'t have information on that topic. I can only provide answers related to medicine.'" },
        {role:'user', 'content': prompt}],
        temperature: 0.9,
        top_p: 1,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0,
    })
    .then((res) => res.choices[0].message.content)
    .catch(
        (err) =>
        `ChatGPT was unable to find an answer! (Error: ${err.message})`
    )

    return res
}

export default query