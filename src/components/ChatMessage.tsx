import { useEffect, useState } from "react";
import { Message } from "../types/Message";

interface ChatMessageProps {
    message: (message: Message) => void;

}


export const ChatMessage = (props: ChatMessageProps) => {
    const [message,setMessage] = useState<Message>()
    const [disabledButton,setDisabledButton] = useState<boolean>()

    const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage({role:'user', message:event.currentTarget.value});
    }

    useEffect(()=>{
        if(!message || message.message.length<2){
            setDisabledButton(true);
        }else{
            setDisabledButton(false);
        }
    },[message])

    const handleSend = () => {
        if(message){
            props.message(message);
        }
    }

    return(
        <div className="flex flex-row flex-1 gap-1 rounded bg-slate-800 p-1 items-center">
            <textarea onChange={textAreaChange} placeholder="What's on your mind?" className="text-slate-400 rounded bg-transparent border border-slate-700 outline-none flex-grow resize-none overflow-hidden"></textarea>
            <button onClick={handleSend} disabled={disabledButton} className={`rounded hover:bg-slate-700 hover:bg-opacity-80 px-2 h-6 text-xs`}>
                Send
            </button>
        </div>
    )

}