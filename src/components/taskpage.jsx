import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./taskpage.css";
import Nv from "./topnav";


const TaskDetails = () => {
  const { taskId } = useParams();
  const [tasks, settasks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/getall", {
      method: "POST",
    body: JSON.stringify({
      "uuid" : localStorage.getItem("uuid"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(r => (r.json()))
  .then(d => {
    settasks(d);
  })
  .catch(e => {console.log(e)});
  }, [])
  const task = tasks.find((todo) => todo._id === (taskId));

  return (
    <>
    <Nv />
    <div className="task-details-container">
      <h1 className="task-details-heading">Task Details</h1>
      {task && (
        <div className="task-details">
          <h2 className="task-name">{task.task_heading}</h2>
          <p className="task-info">{task.description}</p>
          <p className="task-time">Time: {task.time}</p>
          <p className="task-notes">Notes: {task.notes}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default TaskDetails;
