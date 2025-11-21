import "./App.css";
import { useState } from "react";
import SettingsMenu from "./components/SettingsMenu";
import NavBar from "./components/NavBar"; //
import Home from "./components/Home";
import Timer from "./components/Timer";
import ToDoList from "./ToDoList";
import GooberMenu from "./components/GooberMenu";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

type TabId = "todo" | "settings" | "timer";

function AppContent() {
  // Current Players data
  const [currentXP, setXP] = useState(50);
  const [level, setLevel] = useState(9);
  const [money, setMoney] = useState(0);
  const [currentHealth, setHealth] = useState(50);
  
  // Tab management state
  const [openTabs, setOpenTabs] = useState<TabId[]>([]);
  const [tabOrder, setTabOrder] = useState<TabId[]>(["todo", "settings", "timer"]);
  const [draggedTab, setDraggedTab] = useState<TabId | null>(null);
  const [dragOverTab, setDragOverTab] = useState<TabId | null>(null);

  // Toggle tab open/closed
  const toggleTab = (tabId: TabId) => {
    setOpenTabs((prev) => {
      if (prev.includes(tabId)) {
        return prev.filter((id) => id !== tabId);
      } else {
        // If tab is not in order, add it to the end
        if (!tabOrder.includes(tabId)) {
          setTabOrder((prevOrder) => [...prevOrder, tabId]);
        }
        return [...prev, tabId];
      }
    });
  };

  // Clear all tabs
  const clearAllTabs = () => {
    setOpenTabs([]);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, tabId: TabId) => {
    setDraggedTab(tabId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.dropEffect = "move";
    // Create a transparent drag image
    const dragImage = document.createElement("div");
    dragImage.style.opacity = "0";
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const handleDragOver = (e: React.DragEvent, tabId: TabId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedTab && draggedTab !== tabId) {
      setDragOverTab(tabId);
    }
  };

  const handleDragLeave = () => {
    setDragOverTab(null);
  };

  const handleDrop = (e: React.DragEvent, targetTabId: TabId) => {
    e.preventDefault();
    if (draggedTab && draggedTab !== targetTabId) {
      const draggedIndex = tabOrder.indexOf(draggedTab);
      const targetIndex = tabOrder.indexOf(targetTabId);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newOrder = [...tabOrder];
        newOrder.splice(draggedIndex, 1);
        newOrder.splice(targetIndex, 0, draggedTab);
        setTabOrder(newOrder);
      }
    }
    setDraggedTab(null);
    setDragOverTab(null);
  };

  const handleDragEnd = () => {
    setDraggedTab(null);
    setDragOverTab(null);
  };

  // Render tab component
  const renderTab = (tabId: TabId) => {
    const isOpen = openTabs.includes(tabId);
    
    switch (tabId) {
      case "todo":
        return <ToDoList />;
      case "settings":
        return <SettingsMenu />;
      case "timer":
        return <Timer />;
      default:
        return null;
    }
  };

  // Get tab order filtered to only open tabs, maintaining order
  const orderedOpenTabs = tabOrder.filter((tabId) => openTabs.includes(tabId));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <NavBar 
          openTabs={openTabs}
          toggleTab={toggleTab}
          clearAllTabs={clearAllTabs}
        />
      </div>
      <div className="cards-container">
        <GooberMenu
          setXP={setXP}
          setLevel={setLevel}
          setMoney={setMoney}
          setHealth={setHealth}
          currentXP={currentXP}
          level={level}
          money={money}
          currentHealth={currentHealth}
        />
        {orderedOpenTabs.map((tabId) => (
          <div
            key={tabId}
            className={`tab-card-wrapper ${openTabs.includes(tabId) ? "open" : ""} ${draggedTab === tabId ? "dragging" : ""} ${dragOverTab === tabId ? "drag-over" : ""}`}
            draggable={openTabs.includes(tabId)}
            onDragStart={(e) => handleDragStart(e, tabId)}
            onDragOver={(e) => handleDragOver(e, tabId)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, tabId)}
            onDragEnd={handleDragEnd}
            style={{ order: tabOrder.indexOf(tabId) }}
          >
            {openTabs.includes(tabId) && renderTab(tabId)}
          </div>
        ))}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<div />} />
        <Route path="/timer" element={<div />} />
        <Route path="/todo" element={<div />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

function App() {
  // had to add because bootstrap defaults to light mode
  document.documentElement.setAttribute("data-bs-theme", "dark");

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
