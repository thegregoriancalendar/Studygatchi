import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ToDoList() {
  const [items, setItems] = useState([
    "Lock in time",
    "Read Chapters 2-3",
    "Write new Draft",
  ]);
  const [newItem, setNewItem] = useState("");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    () =>
      items.reduce((acc, item) => {
        acc[item] = false;
        return acc;
      }, {} as Record<string, boolean>)
  );

  const addItem = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newItem.trim()) return;

    setItems((prev) => [...prev, newItem]);
    setCheckedItems((prev) => ({ ...prev, [newItem]: false }));
    setNewItem("");
  };

  const checkItem = (item: string) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const removeItem = (item: string) => {
    setItems((prev) => prev.filter((i) => i !== item));
    setCheckedItems((prev) => {
      const copy = { ...prev };
      delete copy[item];
      return copy;
    });
  };

  const handleLockIn = () => {
    // Lock in functionality - can be extended later
    console.log("Locked in!", items);
  };

  return (
    <div className="card bCard todolist-card" style={{ width: "400px" }}>
      <div
        className="card-header"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <text>to do list</text>
      </div>
      <div className="card-body todolist-card-body">
        <div className="todolist-wrapper">
          <div className="todolist-items-container">
            {items.map((item, index) => {
              const itemKey = `${item}-${index}`;
              return (
                <div key={itemKey} className="todolist-task-item">
                  <input
                    type="checkbox"
                    id={`checkbox-${itemKey}`}
                    className="todolist-checkbox"
                    checked={checkedItems[item] || false}
                    onChange={() => checkItem(item)}
                  />
                  <label 
                    htmlFor={`checkbox-${itemKey}`}
                    className={checkedItems[item] ? "todolist-label checked" : "todolist-label"}
                  >
                    {item}
                  </label>
                  <button
                    className="todolist-remove-btn"
                    onClick={() => removeItem(item)}
                    aria-label="Remove task"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <form className="todolist-add-form" onSubmit={addItem}>
          <input
            type="text"
            className="todolist-input"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new task..."
          />
          <button className="todolist-add-btn" type="submit">
            Add Task
          </button>
        </form>
      </div>
      <div className="card-footer todolist-footer">
        <button className="todolist-lockin-btn" onClick={handleLockIn}>
          Lock in!
        </button>
      </div>
    </div>
  );
}
