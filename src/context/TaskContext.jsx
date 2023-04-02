import { createContext, useState, useEffect } from "react";
export const TasksContext = createContext();

const TasksContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const LoadTasks = async () => {
    try {
      let res = await fetch("https://home-tasks-server.onrender.com/tasks");
      let data = await res.json();
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  const UpdateTask = async (id, name) => {
    try {
      await fetch(`https://home-tasks-server.onrender.com/updateTask/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          done: true,
          doneBy: name,
        }),
        cache: "default",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const GetFormatDate = () => {
    let date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return `${day}/${month}/${year}`;
  };

  const GetFormatTime = () => {
    let date = new Date();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const AddNewTask = async (taskName, name) => {
    try {
      await fetch("https://home-tasks-server.onrender.com/addTask", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${taskName} (${name})`,
          date: `${GetFormatDate()} , ${GetFormatTime()}`,
          done: false,
        }),
        cache: "default",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const DeleteTask = async (id) => {
    try {
      await fetch(`https://home-tasks-server.onrender.com/deleteTask/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        cache: "default",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const DeletePassword = (pass) => {
    return pass == "1234";
  };

  useEffect(() => {
    LoadTasks();
  }, [tasks]);

  const value = {
    tasks,
    setTasks,
    UpdateTask,
    AddNewTask,
    DeleteTask,
    DeletePassword,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
export default TasksContextProvider;
