interface ChatMessageProps {
    message: (message: string) => void;

}


export const ChatMessage = (props: ChatMessageProps) => {
    return(
        <div className="flex flex-row gap-2">
            <input type="text" className="rounded bg-slate-500 focus:outline-slate-700"></input>
            <button >Submit</button>
        </div>
    )

}