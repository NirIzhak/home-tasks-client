import React, { useContext, useEffect, useRef, useState } from "react";
import { TasksContext } from "../context/TaskContext";
import Task from "../components/Task";

const Main = () => {
  const { tasks, AddNewTask } = useContext(TasksContext);
  const taskName = useRef("");

  return (
    <>
      <h1>משימות בית</h1>
      <div className="new-task">
        <input type="text" placeholder="שם המשימה" ref={taskName} />
        <button
          onClick={() => {
            AddNewTask(taskName.current.value);
            taskName.current.value = "";
          }}
        >
          {" "}
          + הוסף משימה
        </button>
      </div>

      <div className="map">
        <div className="map-info">
          <div className="cube red"></div>
          <p>לא בוצע</p>
        </div>
        <div className="map-info">
          <div className="cube green"></div>
          <p>בוצע</p>
        </div>
      </div>
      <div>
        {tasks.length != 0 ? (
          tasks.map((t) => <Task key={t._id} {...t} />)
        ) : (
          <h2 className="no-tasks">אין משימות</h2>
        )}
      </div>
    </>
  );
};
export default Main;
