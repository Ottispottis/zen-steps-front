import { useEffect, useState } from "react";
import { AgentCircle } from "./AgentCircle"
import { ChatMessage } from "./ChatMessage";
import { Message } from "../types/Message";

const systemPrompt: Message = {
    role: "system",
    message: "You are a therapist giving a therapy session. Give me a 435 word inspirational meditation session about overcoming opioid addiction and chronic pain. Only output the actual session without ambiance instructions, quotation marks or 'Certainly, here is a 435-word inspirational meditation session on overcoming opioid addiction:'. Remember the key points for future reference."
}

export const Agent = () => {
    const [messages, setMessages] = useState<Message[]>([systemPrompt]);
    const [loadingResponse, setLoadingResponse] = useState<boolean>(false);

    useEffect(() => {
        const handleSend = async () => {
            console.log("API CALL")
            setLoadingResponse(true);
            try {
                const response = await fetch('https://zen-steps.onrender.com/api/v1/openai', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ messages }),
                });
    
                if (!response.ok) {
                    setLoadingResponse(false);
                    throw new Error(`HTTP error! Status: ${response.status}`);
                    
                }
    
                const data = await response.json();
                setLoadingResponse(false);
                console.log('API response:', data);
            } catch (error: any) {
                setLoadingResponse(false);
                console.error('Error sending API request:', error.message);
            }
        };
    
        if (messages.length > 1) {
            handleSend();
            // Clear messages after sending
        }
    }, [messages]);
    
    

    const handleMessage = (message: Message) => {
        
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const backgroundStyle = {
        backgroundImage: "url('public/layered-waves-hakei.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };
    
    return(
        <div className="flex flex-col w-screen bg-slate-900 pt-4 h-full items-center justify-evenly relative ">
            <div className="flex">
                <h1 className=" text-slate-500 text-4xl">Zen Steps</h1>
            </div>
            <div className="flex relative">
                <AgentCircle/>   
            </div>
            {loadingResponse && 
            <div>Loading</div>}
            <div className="flex w-6/12">
                <ChatMessage message={handleMessage}/>
            </div>
            
        </div>
    )
}