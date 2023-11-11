import { AgentCircle } from "./AgentCircle"
import { ChatMessage } from "./ChatMessage";

export const Agent = () => {

    const backgroundStyle = {
        backgroundImage: "url('public/layered-waves-hakei.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };

    const handleMessage = (message: string) => {
        console.log(message);

    }
    
    return(
        <div className="flex flex-col w-screen bg-slate-900 pt-4 h-full items-center justify-evenly relative ">
            <div className="flex">
                <h1 className=" text-slate-300 text-4xl">Zen Steps</h1>
            </div>
                <div className="flex relative">
                    <AgentCircle/>   
                </div>
            <div className="flex">
                <ChatMessage message={handleMessage}/>
            </div>
            
        </div>
    )
}