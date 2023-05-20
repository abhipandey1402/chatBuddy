import style from './ContentSection.module.css'
import { FiSend } from "react-icons/fi";
import { useState } from 'react';
import { useRef } from "react";

const ContentSection = () => {
    const [input, setInput] = useState("");
    const myRef = useRef(null);

    const apiKey = process.env.REACT_APP_API_KEY; // Replace with your actual API key

    const completionEndpoint = "https://api.openai.com/v1/chat/completions";

    async function makeChatCompletionRequest(text) {
        const payload = {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `${text}` }],
        };

        const response = await fetch(completionEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        let displayData = {
            request: `${text}`,
            response: `${data.choices[0].message.content}`
        }

        let result = localStorage.getItem('result');
        if (!result) {
            result = [displayData];
        } else {
            result = JSON.parse(result);
            result.push(displayData);
        }
        localStorage.setItem('result', JSON.stringify(result));

        JSON.parse(localStorage.getItem('result')).forEach((item) => {
            if (myRef.current) {
                myRef.current.innerHTML += `<h5>Abhi :-  ${item.request}</h5>`;
                myRef.current.innerHTML += `<p>Buddy :-  ${item.response}</p>`;
            }
        })

        setInput("");
    }


    return (
        <div className={style.box}>
            <div className={style.messageBox} ref={myRef}>

            </div>
            <div className={style.messageInput}>
                <input type='text' className={style.input} placeholder="Send a message." onChange={(e) => setInput(e.target.value)} value={input}></input>
                <button className={style.submitBtn} onClick={() => makeChatCompletionRequest(input)}><FiSend /></button>
            </div>
        </div>
    )
}

export default ContentSection;

