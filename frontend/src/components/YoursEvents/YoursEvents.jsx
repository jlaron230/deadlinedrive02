import React, { useState, useEffect } from 'react'
import axios from 'axios'

const YoursEvents = () => {
  // Initialize state to store tasks
  const [tasks, setTasks] = useState([]);

  // useEffect hook to fetch tasks when the component mounts
  useEffect(() => {
    // Define an asynchronous function to fetch tasks from the server
    const fetchTasks = async () => {
      try {
        // Make a GET request to the server to retrieve tasks
        const response = await axios.get('http://localhost:5000/tasks');
        
        // Sort tasks by deadline in ascending order
        const sortedTasks = response.data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        
        // Get the first three tasks from the sorted list
        const threeRecentTasks = sortedTasks.slice(0, 3);
        
        // Update the state with the recent tasks
        setTasks(threeRecentTasks);
      } catch (error) {
        // Log an error message to the console if the request fails
        console.error("Error fetching tasks:", error);
      }
    };

    // Call the fetchTasks function
    fetchTasks();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <h2 class=" py-7 font-semibold text-xl flex justify-center">Vos évènements</h2>
      {/* Map over the tasks array and render each task */}
      <div class=" grid md:grid-cols-3 ">
      {tasks.map((task, index) => (
        <div key={index} class=" border-solid border-2 border-caramel rounded-lg m-6 p-4 ">
          {/* Display the task title, centered */}
          <p className="font-semibold text-align">{task.title}</p>
          {/* Display the task deadline, formatted as a date, bold and centered */}
          <p className=" text-align">{new Date(task.deadline).toLocaleDateString()}</p>

          <p className="text-align">{task.description}</p>
          <p className="text-align italic">{task.status}</p>
        </div>
      ))}
      </div>
    </div>
  );
};


export default YoursEvents