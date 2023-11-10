import { AgentCircle } from "./AgentCircle"

export const Agent = () => {

    const backgroundStyle = {
        backgroundImage: "url('public/layered-waves-hakei.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };
    
    return(
        <div style={backgroundStyle}>
            <div>
                HELLO
            </div>
            <AgentCircle/>
        </div>
    )
}