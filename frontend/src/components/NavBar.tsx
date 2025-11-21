import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

type TabId = "todo" | "settings" | "timer";

interface NavBarProps {
    openTabs: TabId[];
    toggleTab: (tabId: TabId) => void;
    clearAllTabs: () => void;
}

const NavBar = ({ openTabs, toggleTab, clearAllTabs }: NavBarProps) => {
    const navigate = useNavigate();
    
    const handleSettingsClick = () => {
        toggleTab('settings');
        navigate('/');
    }
    
    const handleTimerClick = () => {
        toggleTab('timer');
        navigate('/');
    }
    
    const handleHomeClick = () => {
        clearAllTabs();
        navigate('/');
    }
    
    const handleToDo = () => {
        toggleTab('todo');
        navigate('/');
    }
    
    return (
        <div>
            <button onClick={handleHomeClick}>Home</button>
            <button onClick={handleSettingsClick}>Settings</button>
            <button onClick={handleTimerClick}>Timer</button>
            <button onClick={handleToDo}>To Do</button>
        </div>
        
    )
}

export default NavBar;