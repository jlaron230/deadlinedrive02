import { useState, useEffect } from "react";
import axios from "axios";
import YoursEvents from "@components/YoursEvents/YoursEvents";
import CalendarComponents from "@components/Calendar/CalendarComponents";

export default function Calendar() {
  const [tasks, setTasks] = useState([]); // State pour stocker les tâches

  const idUser = () => {
    const user_id = JSON.parse(localStorage.getItem("id")); // assuming the whole user object is stored with key 'user'
    return user_id; // return the id if user exists, otherwise return null
  };

  const fetchTasks = async () => {
    const user_id = idUser();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/tasks`
      );
      const userTasks = response.data.filter(
        (task) => task.id_user === user_id
      );
      setTasks(userTasks); // Update the task
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // useEffect for the recup the task
  useEffect(() => {
    fetchTasks(); // Call the function when mounted
  }, []); // Empty for only run once


  return (
    <>
      <YoursEvents tasks={tasks} setTasks={setTasks} fetchTasks={fetchTasks}/>
      <CalendarComponents tasks={tasks} setTasks={setTasks} fetchTasks={fetchTasks}/>
    </>
  );
}
