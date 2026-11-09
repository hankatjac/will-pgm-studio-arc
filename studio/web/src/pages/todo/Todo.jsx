import { useState, useEffect, useContext } from "react";
import Header from "./Header";
import AddTask from "./AddTask";
import axios from "axios";
import { AppContext } from "../../contexts/appContext";
import { useNavigate } from "react-router-dom";

import Confirm from "../../components/Confirm";
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";

const Todo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const { logout } = useContext(AppContext);
  const [showAddTask, setShowAddTask] = useState(false);
  const [fetch, setFetch] = useState(true);
  const [editTask, setEditTask] = useState(null);
  const [taskIdToDelete, setTaskIdToDelete] = useState("");
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (fetch) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/todo`);
          setTasks(res.data);
        } catch (err) {
          if (err.response.status === 401) {
            logout();
            nav("/login");
          }
          console.error(err);
          alert(err.response.data.message);
        }
        setFetch(false);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [fetch, logout, nav]);

  // Add Task
  const addTask = async (task) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/todo/`, task);
      setFetch(true);
    } catch (err) {
      alert(err.response.data.message);
      if (err.response.status === 401) {
        logout();
        nav("/login");
      }
      console.log(err);
    }
    // setTasks([...tasks, task]);
  };

  const toggleReminder = async (task) => {
    const updatedTask = { ...task, reminder: !task.reminder };
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/todo/${task.id}`,
        updatedTask
      );
    } catch (err) {
      alert(err.response.data.message);
      if (err.response.status === 401) {
        logout();
        nav("/login");
      }
      console.error(err);
      return;
    }
    setTasks(
      tasks.map((t) => (t.id === task.id ? { ...t, reminder: !t.reminder } : t))
    );
  };

  const editTaskClick = (task) => {
    setShowAddTask(!showAddTask);
    setEditTask(task);
  };

  const handleEditTask = async (task) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/todo/${task.id}`,
        task
      );
    } catch (err) {
      alert(err.response.data.message);
      if (err.response.status === 401) {
        logout();
        nav("/login");
      }
      console.error(err);
      return;
    }
    setTasks(tasks.map((t) => (t.id === editTask.id ? { ...task } : t)));
  };

  const handleDeleteClick = (id) => {
    setTaskIdToDelete(id);
    setOpenDialog(true);
  };

  const confirmDeleteTask = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/todo/${taskIdToDelete}`
      );
      setFetch(true);
      setOpenDialog(false);
    } catch (err) {
      alert(err.response.data.message);
      if (err.response.status === 401) {
        logout();
        nav("/login");
      }
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto my-10 max-w-lg p-6 bg-white shadow-lg rounded-lg">
      <Header
        toggleAdd={() => setShowAddTask(!showAddTask)}
        showAddTask={showAddTask}
        setEditTask={() => setEditTask("")}
      />

      {showAddTask && (
        <AddTask
          onAdd={addTask}
          onEdit={handleEditTask}
          editTask={editTask}
          setShowAddTask={setShowAddTask}
        />
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`task p-4 my-3 bg-gray-100 rounded-lg flex justify-between items-center cursor-pointer ${
              task.reminder ? "border-l-4 border-blue-500" : ""
            }`}
            onDoubleClick={() => toggleReminder(task)}
          >
            <div>
              <h3 className="text-lg font-semibold">{task.text}</h3>
              <p className="text-sm text-gray-600">{task.day}</p>
            </div>
            <div className="flex items-center space-x-3">
              <MdDelete
                className="text-red-500 cursor-pointer text-2xl"
                onClick={() => handleDeleteClick(task.id)}
              />
              <GrEdit
                className="text-blue-500 cursor-pointer text-2xl"
                onClick={() => editTaskClick(task)}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No Tasks To Show</p>
      )}

      <Confirm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={confirmDeleteTask}
        title="Confirm Deletion"
        description="Are you sure you want to delete this event? This action cannot be undone."
      />
    </div>
  );
};

export default Todo;
