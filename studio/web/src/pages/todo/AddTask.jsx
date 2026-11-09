import { useState } from "react";

const AddTask = ({ onAdd, onEdit, editTask, setShowAddTask }) => {
  const [id] = useState(editTask.id || ""); // Removed `setId`
  const [text, setText] = useState(editTask.text || "");
  const [day, setDay] = useState(editTask.day || "");
  const [reminder, setReminder] = useState(editTask.reminder || false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a task");
      return;
    }
    if (editTask) {
      onEdit({ id, text, day, reminder });
      setShowAddTask(false);
    } else {
      onAdd({ text, day, reminder });
    }

    setText("");
    setDay("");
    setReminder(false);
  };

  return (
    <form
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
      onSubmit={onSubmit}
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Day & Time</label>
        <input
          type="text"
          placeholder="Add Day & Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
          className="mr-2 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="text-gray-700 font-semibold">Set Reminder</label>
      </div>

      <input
        type="submit"
        value="Save Task"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md cursor-pointer transition-all"
      />
    </form>
  );
};

export default AddTask;
