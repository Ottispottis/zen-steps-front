import { useEffect, useState } from "react";
import { AgentCircle } from "./AgentCircle"
import { ChatMessage } from "./ChatMessage";
import { Message } from "../types/Message";

const systemPrompt: Message = {

    role: "system",
    content: "You are a therapist giving a therapy session. Give me a 130 word inspirational meditation session about overcoming chronic pain. Only output the actual session without ambiance instructions, quotation marks or 'Certainly, here is a 130-word inspirational meditation session on overcoming chronic pain:'. Remember the key points for future reference."
}

export const Agent = () => {
    const [conversation, setConversation] = useState<Message[]>([systemPrompt]);
    const [loadingResponse, setLoadingResponse] = useState<boolean>(false);
    const [sendPressed, setSendPressed] = useState<boolean>(false);

    useEffect(() => {
        const handleSend = async () => {
            console.log("API CALL")
            setLoadingResponse(true);
            console.log(conversation)
            try {
                const response = await fetch('http://192.168.159.231:3000/api/v1/openai', {
                    method: 'POST',
                    //mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({ messages: conversation }),
                });
    
                if (!response.ok) {
                    setLoadingResponse(false);
                    setSendPressed(false);
                    throw new Error(`HTTP error! Status: ${response.status}`);
                    
                }
    
                const data = await response.json();
                setLoadingResponse(false);
                setSendPressed(false);
                console.log('API response:', data);
                setConversation((prevMessages) => [...prevMessages, { role: 'assistant', content: data.content}]);
                //makeSpeech(data.content)
            } catch (error: any) {
                setSendPressed(false);
                setLoadingResponse(false);
                console.error('Error sending API request:', error.message);
            }
        };

        
    
        if (sendPressed) {
            handleSend();
        }
    }, [sendPressed]);

    const makeSpeech = async (content: string) => {
        const audio = new Audio();
        try {
            const response = await fetch('http://192.168.159.231:3000/api/v1/speech', {
                method: 'POST',
                //mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ content }),
            });

            if (!response.ok) {
                setLoadingResponse(false);
                setSendPressed(false);
                throw new Error(`HTTP error! Status: ${response.status}`);
                
            }
            
            const data = await response.blob();
            const url = window.URL.createObjectURL(data)
            audio.src = url
            audio.play();
            console.log(data);
            
        } catch (error: any) {
            setSendPressed(false);
            setLoadingResponse(false);
            console.error('Error sending API request:', error.message);
        }

    }
    
    const handleMessage = (message: Message) => {
        
      setConversation((prevMessages) => [...prevMessages, message]);
      setSendPressed(true);
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
            <div className="flex relative">
                <div className="loader">
                    <div className="cell d-0"></div>
                    <div className="cell d-1"></div>
                    <div className="cell d-2"></div>

                    <div className="cell d-1"></div>
                    <div className="cell d-2"></div>


                    <div className="cell d-2"></div>
                    <div className="cell d-3"></div>


                    <div className="cell d-3"></div>
                    <div className="cell d-4"></div>
                </div>
            </div>
            }
            <div className="flex w-6/12">
                <ChatMessage message={handleMessage}/>
            </div>
            
        </div>
    )
}