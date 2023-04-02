import React, { useContext, useState } from "react";
import { TasksContext } from "../context/TaskContext";

const Task = ({ name, date, _id, done, doneBy }) => {
  const { UpdateTask, DeleteTask, DeletePassword } = useContext(TasksContext);

  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  return (
    <div
      className="task"
      style={{
        backgroundColor: done ? "rgb(101, 216, 101)" : "rgb(239, 71, 71)",
      }}
    >
      <p
        onClick={() => {
          let password = prompt("\u200f\u200f" + "סיסמא:");

          DeletePassword(password)
            ? DeleteTask(_id)
            : alert("סיסמא לא נכונה, המשימה לא נמחקה");
        }}
        className="deleteBt"
      >
        X
      </p>
      <span>
        <p className="task-name">{name}</p>
        <p className="task-date">התווספה ב: {date}</p>
        <p className="task-doneBy">
          {doneBy == null ? "לא בוצע עדיין" : `בוצע ע"י ${doneBy}`}
        </p>
      </span>
      <button
        disabled={done}
        onClick={() => {
          let name = prompt("שם:");
          !isEmptyOrSpaces(name) ? UpdateTask(_id, name) : alert("חייב להכניס את שם מבצע המשימה")
        }}
      >
        ביצוע משימה
      </button>
    </div>
  );
};
export default Task;
