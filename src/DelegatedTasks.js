import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const TaskDelegationPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cpf = queryParams.get('cpf_no'); // Use 'cpf_no' as the query param to match the server

  useEffect(() => {
    console.log(cpf)
    if (cpf) {
      // Make sure to use 'cpf_no' in the query string to match the server
      fetch(`http://172.16.250.253:5006/delegated-tasks?cpf_no=${cpf}`)
        .then(response => response.json())
        .then(data => {
          setTasks(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
    console.log(tasks)
    
  }, [cpf]);

  // Function to calculate the pending days
  const calculatePendingDays = (assignedDate) => {
    const currentDate = new Date();
    // console.log(assignedDate);
    // console.log(tasks)
    const assignedDateObj = new Date(assignedDate);
    const diffTime = currentDate - assignedDateObj;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return diffDays > 0 ? diffDays : 0; // Return 0 if negative days (i.e., if the task is assigned in the future)
  };

  return (
    <div className="container-fluid mt-4">
      <div className="text-center bg-primary text-white py-3 rounded mb-4">
        <h2 className="fw-bold">Delegated Tasks</h2>
      </div>
      <h2 className="mb-4">Delegated Tasks of CPF: {cpf}</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Description</th>
              <th>Assigned By</th>
              <th>Assigned Date</th>
              <th>Deadline</th>
              <th>Pending Days</th>
              <th>Time taken</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.task_name}</td>
                  <td>{task.assigned_to}</td>
                  <td>{task.task_status}</td>
                  <td>{task.task_priority}</td>
                  <td>{task.task_description}</td>
                  <td>{task.assigned_by}</td>
                  <td>{new Date(task.assigned_date).toLocaleDateString('en-GB')}</td>
                  <td>{new Date(task.task_deadline).toLocaleDateString('en-GB')}</td>
                  {/* <td>{calculatePendingDays(task.assigned_date)}</td> Calculate pending days */}
                  <td>{task.task_status == 'Completed' ? 'Completed': calculatePendingDays(task.assigned_date)}</td>
                  <td>{task.task_status == 'Completed' ? task.pending_days ? task.pending_days: "" : ''}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="9">No tasks found for this CPF number.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskDelegationPage;
