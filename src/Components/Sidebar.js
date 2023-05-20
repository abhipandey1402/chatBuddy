import sidebarStyle from "./Sidebar.module.css";

const Sidebar = () =>{
    function reset(){
        localStorage.removeItem('result');
    }

    return (
        <div className={sidebarStyle.container}>
            <div className={sidebarStyle.brand}>
                <h1>ChatBuddy</h1>
            </div>
            <button className={sidebarStyle.newChatBtn} onClick={() => reset()}>+ New chat</button>
            
        </div>
    )
}

export default Sidebar;