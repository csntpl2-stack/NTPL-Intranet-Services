import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AssignedTasks from "./TaskList";  // Importing AssignedTasks
import Navbar from "./TaskMngNavbar";

const AssignTask = () => {
const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    task_name: "",
    task_status: "Pending",
    task_priority: "Normal",
    task_description: "",
    assigned_to: "",
    task_deadline: "",
  });
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isRoleAuthorized, setIsRoleAuthorized] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState([]);  // Track the list of assigned tasks
  const [refresh,setRefresh] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cpf_no = queryParams.get("cpf_no"); // Get CPF number from the query

  const fetchUserDetails = () => {
    if (cpf_no) {
      fetch(`http://172.16.250.253:5006/task_user?cpf_no=${cpf_no}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            const currentUser = data[0];
            setUser(currentUser); // Assuming data contains an array of one user
            checkAuthorization(currentUser.Role); // Check role authorization
          } else {
            console.error("User not found");
          }
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  };

  // Function to check if the user's role allows task assignment
  const checkAuthorization = (role) => {
    if (["HOD", "GM", "CEO", "CFO"].includes(role)) {
      setIsRoleAuthorized(true);
    } else {
      setIsRoleAuthorized(false);
    }
  };

  // Function to fetch assignees
const fetchAssignees = () => {
  if (isRoleAuthorized && user) {
    const userData = {
      cpf_no: user.CPF_No,
      role: user.Role,
      department: user.Department,
      is_role_authorized: isRoleAuthorized
    };

    fetch("http://172.16.250.253:5006/get-assignees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }
};

  // Handle form input changes
  const handleInputChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  // Handle adding a new task
  const handleAddTask = async () => {
    if (taskData.task_name) {
      const newTask = {
        ...taskData,
        assigned_to: taskData.assigned_to || user.CPF_No,  // Default to current user if not selected
        assigned_by: user.CPF_No,  // Assuming the same user assigns the task
        assigned_date: new Date().toISOString().split("T")[0],
      };

      try {
        const response = await fetch("http://172.16.250.253:5006/assign-task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });
        const result = await response.json();

        if (result.success) {
          // Show success message
          alert("Task added successfully!");

          fetchAssignedTasks();

          // Add the new task to the assigned tasks list in state
          setAssignedTasks((prevTasks) => [...prevTasks, newTask]);

          // Reset task form fields
          setTaskData({
            task_name: "",
            task_description: "",
            task_status: "Pending",
            task_priority: "Normal",
            task_deadline: "",
            assigned_to: "",
          });
        } else {
          alert("Failed to assign task: " + result.message);
        }
      } catch (error) {
        console.error("Error assigning task:", error);
        alert("Error assigning task. Please try again.");
      }
    }
  };

  // Handle deleting a task
  const handleDeleteTask = (taskId) => {
    fetch("http://172.16.250.253:5006/delete-task", {
      method: "POST",  // Changed from DELETE to POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: taskId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Task deleted successfully.");
          setAssignedTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== taskId)
          );
        } else {
          alert("Failed to delete task.");
        }
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        alert("Error deleting task.");
      });
  };

  // Handle editing a task
  const handleEditTask = (taskId, updatedStatus, days) => {
    console.log({ id: taskId, task_status: updatedStatus, days: days });
    
    fetch("http://172.16.250.253:5006/edit-task", {
      method: "POST",  // Changed from PUT to POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: taskId, task_status: updatedStatus, days: days }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Task status updated successfully.");
          setAssignedTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === taskId ? { ...task, task_status: updatedStatus } : task
            )
          );
        } else {
          alert("Failed to update task status.");
        }
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
        alert("Error updating task status.");
      });
  };
  
  // Function to fetch assigned tasks from the server
const fetchAssignedTasks = () => {
  if (user) {
    fetch(`http://172.16.250.253:5006/get-assigned-tasks?cpf_no=${user.CPF_No}`)
      .then((response) => response.json())
      .then((data) => {
        setAssignedTasks(data);
      })
      .catch((error) => console.error("Error fetching assigned tasks:", error));
  }
};

useEffect(() => {
  fetchAssignees();
}, [user]); 

  useEffect(() => {
    fetchAssignedTasks();  
    fetchAssignees();
    fetchUserDetails();
    setRefresh(!refresh);
  }, [ taskData, assignedTasks]); 

  if (!user) {
    return <div className="text-center">Loading user information...</div>;
  }

  return (
    <div  className="container-fluid">
      <Navbar user={user} />
      <div className="container-fluid mt-4">
        
        <AssignedTasks
          userCPF={user.CPF_No}
          userRole={user.Role}
          tasks={assignedTasks} 
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          title = 'Assigned Tasks:'
          filtertype='1'
          sync = {refresh}
        />
        <AssignedTasks
          userCPF={user.CPF_No}
          userRole={user.Role}
          tasks={assignedTasks} 
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          title = 'Today To Do list:'
          filtertype='2'
          sync = {refresh}
        />

        <h3 className="mb-4">Assign a New Task</h3>

        {/* Input fields in a single row */}
        <div className="table-responsive mb-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Task Description</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Assign To</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="task_name"
                    value={taskData.task_name}
                    onChange={handleInputChange}
                    placeholder="Enter task name"
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="task_description"
                    value={taskData.task_description}
                    onChange={handleInputChange}
                    placeholder="Enter task description"
                    required
                  />
                </td>
                <td>
                  <select
                    className="form-control"
                    name="task_status"
                    value={taskData.task_status}
                    onChange={handleInputChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td>
                  <select
                    className="form-control"
                    name="task_priority"
                    value={taskData.task_priority}
                    onChange={handleInputChange}
                  >
                    <option value="Normal">Normal</option>
                    <option value="High Priority">High Priority</option>
                    <option value="Important">Important</option>
                    <option value="High priority and important">High priority and important</option>
                  </select>
                </td>
                <td>
                  <input
                    type="date"
                    className="form-control"
                    name="task_deadline"
                    value={taskData.task_deadline}
                    onChange={handleInputChange}
                    required
                  />
                </td>
                <td>
                  <select
                    className="form-control"
                    name="assigned_to"
                    value={taskData.assigned_to}
                    onChange={handleInputChange}
                  >
                    
                    {isRoleAuthorized ? users.map((user) => (
                      <option key={user.CPF_No} value={user.CPF_No}>
                        {user.Name}
                      </option>
                    )):<option value={user.CPF_No}>{user.CPF_No}</option>}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Add Task Button */}
        <div className="text-center">
          <button style={{width:'15%'}} className="btn btn-primary" onClick={handleAddTask}>
            Add Task
          </button>
         
        </div>
        {isRoleAuthorized && 
        <button onClick={()=>{navigate(`/delegatedtasks?cpf_no=${cpf_no}`)}} style={{width:'10%',marginBottom:"5px"}} className="btn btn-success">Delegated Tasks</button>
        }
      </div>
    </div>
  );
};

export default AssignTask;
