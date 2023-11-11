import { useEffect, useState } from "react";
import { AgentCircle } from "./AgentCircle"
import { ChatMessage } from "./ChatMessage";

export const Agent = () => {
    const [messages, setMessages] = useState<string[]>([]);
    useEffect(() =>{
        const handleSend = async () => {
            console.log("API CALL")
            try {
              const response = await fetch('https://zen-steps.onrender.com/api/v1/openai', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: messages }),
              });
        
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
        
              const data = await response.json();
              console.log('API response:', data);
            } catch (error: any) {
              console.error('Error sending API request:', error.message);
            }
          };
          if(messages.length>0){
            handleSend();  
          }
    },[messages])
    

        const handleMessage = (message: string) => {
            
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
            <div className="flex w-6/12">
                <ChatMessage message={handleMessage}/>
            </div>
            
        </div>
    )
}