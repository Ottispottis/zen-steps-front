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
        
        <div className="flex flex-row gap-1 rounded bg-slate-800 p-1 items-center flex-1 ">
            <input ref={inputRef} onChange={handleUsernameChange} className="text-slate-400 rounded bg-transparent border border-slate-700 outline-none flex-grow resize-none overflow-hidden sm:text-lg text-xs" placeholder="Please type your name"></input>
            <button className="rounded text-slate-400 hover:bg-slate-700 hover:bg-opacity-80 px-2 h-6 text-xs" onClick={handleNameSet}>Set your name</button>
        </div>
    )
}