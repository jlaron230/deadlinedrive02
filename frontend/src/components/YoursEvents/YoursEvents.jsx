import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion';

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
        
       // Get the current date
       const now = new Date();

        // Filter out tasks with deadlines in the past
        const futureTasks = response.data.filter(task => new Date(task.deadline) >= now);
        
        // Sort tasks by deadline in ascending order
        const sortedTasks = futureTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        
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
          <motion.div 
          key={index}
          className="border-solid border-2 border-caramel rounded-lg m-6 p-4"
          initial={{ opacity: 0, x: -100 }} // Start off-screen to the left
          animate={{ opacity: 1, x: 0 }}    // Slide in to the final position
          transition={{ duration: 0.5, delay: index * 0.2 }} // Add delay for staggered effect
        >
          <p className="font-semibold text-align">{task.title}</p>
          <p className="text-align">{new Date(task.deadline).toLocaleDateString()}</p>
          <p className="text-align">{task.description}</p>
          <p className="text-align italic">{task.status}</p>
        </motion.div>
      ))}
      </div>
    </div>
  );
};


export default YoursEvents