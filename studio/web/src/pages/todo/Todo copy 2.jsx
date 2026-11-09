import { useState, useEffect } from "react";
import Header from "./Header";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
import axios from "axios";

const Todo = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [editTask, setEditTask] = useState("");
  const [tasks, setTasks] = useState([
    // {
    //   id: 1,
    //   text: "Big Meeting",
    //   day: "Feb 2 2023 03:00:00",
    //   reminder: true,
    // },
    // {
    //   id: 2,
    //   text: "Vacation",
    //   day: "Feb 2 2023 03:00:00",
    //   reminder: true,
    // },
    // {
    //   id: 3,
    //   text: "Conference",
    //   day: "Feb 2 2023 03:00:00",
    //   reminder: true,
    // },
    // {
    //   id: 4,
    //   text: "Maintenance",
    //   day: "Feb 2 2023 03:00:00",
    //   reminder: true,
    // },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/todos`);
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Fetch Task
  // const fetchTask = async (id) => {
  //   const res = await fetch(`http://localhost:5000/tasks/${id}`);
  //   const data = await res.json();

  //   return data;
  // };

  // Add Task
  const addTask = async (task) => {
    try {
      await axios.post(`/todos/`, task);
    } catch (err) {
      // setError(err.response.data);
      console.log(err);
    }

    setTasks([...tasks, task]);
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
    } catch (err) {
      console.log(err);
    }

    //  We should control the response status to decide if we will change the state or not.

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (task) => {
    // try {
    //   const res = await axios.get(`/todos/${task.id}`);
    //   setEditTask(res.data);
    // } catch (err) {
    //   console.log(err);
    // }
    // console.log(task);
    const updTask = { ...task, reminder: !task.reminder };

    try {
      await axios.put(`/todos/${task.id}`, updTask);
    } catch (err) {
      // setError(err.response.data);
      console.log(err);
    }
    const index = tasks.findIndex((t) => t === task);
    const updatedTasks = tasks.slice();
    updatedTasks[index].reminder = !task.reminder;

    setTasks(updatedTasks);

    // setTasks(
    //   tasks.map((task) =>
    //     task.id === id ? { ...task, reminder: !task.reminder } : task
    //   )
    // );
  };

  //pass the task for edit
  const handleEditTask = (task) => {
    // console.log(task.id);
    setShowAddTask(!showAddTask);

    // tasks.map((task) => (task.id === id ? setEditTask(task) : ""));
    setEditTask(task);
  };
  // console.log("task for edit", editTask);

  // save updatedtask to database
  const handleEditTask2 = (task) => {
    try {
      axios.put(`/todos/${task.id}`, task);
    } catch (err) {
      // setError(err.response.data);
      console.log(err);
    }
    const index = tasks.findIndex((t) => t === editTask);
    const updatedTasks = tasks.slice();
    updatedTasks[index].text = task.text;
    updatedTasks[index].date = task.day;
    updatedTasks[index].reminder = task.reminder;

    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <Header
        toggleAdd={() => setShowAddTask(!showAddTask)}
        showAddTask={showAddTask}
        setEditTask={() => setEditTask("")}
      />

      {showAddTask && (
        <AddTask
          addTask={addTask}
          onEdit={handleEditTask2}
          toUpdateTask={editTask}
          setShowAddTask={setShowAddTask}
        />
      )}
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleReminder}
          onEdit={handleEditTask}
        />
      ) : (
        "No Tasks To Show"
      )}
    </div>
  );
};

export default Todo;
