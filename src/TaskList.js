import React, { useState, useEffect } from "react";

const AssignedTasks = ({ userCPF, userRole, onDeleteTask, onEditTask,title,filtertype,sync }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (userCPF) {
      fetch("http://172.16.250.253:5006/get-tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assigned_to: userCPF }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            const filteredTasks = data.tasks
              .map((task) => ({ ...task, isEditing: false }))
              .filter((task) => {
                const taskDeadline = new Date(task.task_deadline);
                const currentDate = new Date();
                
                // Format both dates as 'yyyy-mm-dd' to ignore time part
                const taskDeadlineFormatted = taskDeadline.toISOString().split('T')[0];
                const currentDateFormatted = currentDate.toISOString().split('T')[0];
  
                // Filter tasks based on filtertype
                return filtertype === '1'
                  ? taskDeadline >= currentDate
                  : taskDeadlineFormatted === currentDateFormatted;
              });
            setTasks(filteredTasks); // Initialize tasks with filtered tasks
          } else {
            console.error("No tasks found:", data.message);
          }
        })
        .catch((error) => console.error("Error fetching tasks:", error));
    }
  }, [userCPF, filtertype,sync]);

  const handleEditClick = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isEditing: true } : task
      )
    );
  };

  // Function to calculate the pending days
  const calculatePendingDays = (assignedDate) => {
    const currentDate = new Date();
    console.log(assignedDate);
    
    const assignedDateObj = new Date(assignedDate);
    const diffTime = currentDate - assignedDateObj;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return diffDays > 0 ? diffDays : 0; // Return 0 if negative days (i.e., if the task is assigned in the future)
  };

  const handleSaveClick = (taskId, newStatus) => {
    const task = tasks.find((task) => task.id === taskId);

  if (task) {
    const assignedDate = task.assigned_date; // Extract assigned date
    console.log("Assigned Date:", assignedDate);
    
    const days = calculatePendingDays(assignedDate)

    if(newStatus == 'Completed')
      onEditTask(taskId, { task_status: newStatus, days: days }); 
    else
    onEditTask(taskId, { task_status: newStatus }); 

    console.log("New Status:", newStatus);

    // Update UI after saving
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, task_status: newStatus, isEditing: false }
          : task
      )
    );
  };}

  const handleCarryForward = (taskId) => {
    // Make the API request to increment the deadline by one day
    fetch('http://172.16.250.253:5006/increment-deadline', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskId }), // Sending the taskId to the server
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Task deadline updated successfully:', data.newDeadline);
          
          // Optionally, update the state or UI to reflect the new deadline
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === taskId
                ? { ...task, task_deadline: data.newDeadline } // Update the deadline in state
                : task
            )
          );
        } else {
          console.error('Failed to update deadline:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  };

  return (
    <div>
      <h3 className="mb-4">{title}</h3>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Assigned By</th>
              <th>Edit Task</th>
              <th>Delete Task</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.task_name}</td>
                <td>{task.task_description}</td>
                <td>
                  {task.isEditing ? (
                    <select
                      value={task.task_status}
                      onChange={(e) =>
                        setTasks((prevTasks) =>
                          prevTasks.map((t) =>
                            t.id === task.id
                              ? { ...t, task_status: e.target.value }
                              : t
                          )
                        )
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  ) : (
                    <>
                      {task.task_status}
                      <span
                        style={{
                          display: "inline-block",
                          width: "15px",
                          height: "15px",
                          borderRadius: "50%",
                          marginLeft: "5px",
                          backgroundColor:
                            task.task_status === "Pending"
                              ? "red"
                              : task.task_status === "In Progress"
                              ? "#d4a017"
                              : task.task_status === "Completed"
                              ? "green"
                              : "white",
                        }}
                      ></span>
                    </>
                  )}
                </td>
                <td>{task.task_priority}</td>
                <td>{new Date(task.task_deadline).toLocaleDateString('en-GB')}</td>
                <td>{task.assigned_by}</td>
                <td>
                  {task.isEditing ? (
                    <button
                      className="btn btn-success"
                      onClick={() => handleSaveClick(task.id, task.task_status)}
                    >
                      Save
                    </button>
                  ) : (
                    <div className="d-flex">
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEditClick(task.id)}
                      >
                        Edit
                      </button>
                      {filtertype=='2' &&
                      <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleCarryForward(task.id)}
                    >
                      Carry Forward
                    </button>}
                    </div>
                  )}
                </td>
                <td>
                  {task.assigned_by === userCPF && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedTasks
