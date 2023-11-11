import { useRef, useState } from "react";

interface UsernameProps {
    username: (username: string) => void;
}

export const Username = (props: UsernameProps) => {
    const [username, setUsername] = useState<string>()
    const inputRef = useRef<HTMLInputElement>(null);
    
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handleNameSet = () => {
        if(username){
            props.username(username);
            
        }
        //if(inputRef.current){
        //    inputRef.current.value = ''
        //}
        
    }


    return (
        
        <div className="flex flex-row rounded bg-slate-800 p-1 items-center flex-1 hover:shadow-[0_0px_5px_rgba(8,_112,_184,_0.7)] gap-2">
            <input ref={inputRef} onChange={handleUsernameChange} className="text-slate-400 rounded bg-transparent outline-none flex-grow resize-none overflow-hidden sm:text-lg text-xs" placeholder="Please type your name"></input>
            <button className="rounded text-slate-400 hover:bg-slate-700 hover:bg-opacity-80 px-2 h-full text-xs" onClick={handleNameSet}>Set</button>
        </div>
    )
}