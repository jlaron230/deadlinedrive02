import { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import frLocale from '@fullcalendar/core/locales/fr';


export default function CalendarComponents() {
  const [weekendsVisible, setWeekendsVisible] = useState(true); // State to toggle weekends visibility in the calendar.
  const [currentEvents, setCurrentEvents] = useState([]); // State to store current events.
  const [loading, setLoading] = useState(true); // State to indicate loading status.

  // let calendar = new Calendar(calendarEl, {
  //   locale: frLocale,
  //   locale: 'fr'
  // });

  // useEffect hook to fetch tasks from the server when the component mounts.
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tasks"); // Fetch tasks from the server.
        const tasks = response.data.map((task) => ({
          title: task.title,
          date: formatDate(task.deadline), // Format the date for the calendar.
          id: task.id,
        }));
        setCurrentEvents(tasks); // Update the state with fetched tasks.
        setLoading(false); // Indicate that loading is complete.
      } catch (error) {
        console.error("Error fetching tasks", error); // Handle error.
        setLoading(false); // Indicate that loading is complete even if there's an error.
      }
    };
    fetchTasks(); // Invoke the fetchTasks function.
  }, []); // Empty dependency array means this effect runs once on mount.

  // Function to format date to "YYYY-MM-DD".
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear(); 
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
    const day = date.getDate().toString().padStart(2, "0"); 
    return `${year}-${month}-${day}`;
}

  console.log(currentEvents);

  // Function to toggle weekends visibility.
  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  // Function to handle date selection in the calendar.
  const handleDateSelect = async (selectInfo) => {
    let title = prompt("Donnez un titre à votre tâche!");
    let description = prompt("Décrivez votre tâche !");
    let status = prompt("Quel est son status ?");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // Unselect the date range.

    if (title) {
      let task = {
        id: createEventId(), // Create a unique ID for the task.
        title,
        description: description,
        status: status,
        start: selectInfo.startStr,
        id_user: 10,
      };
      calendarApi.addEvent(task); // Add the task to the calendar.

      try {
        const response = await axios.post("http://localhost:5000/tasks", task); // Send the new task to the server.
        const eventWithId = { ...task, id: response.data.id }; // Update task with the ID from the server.
        setCurrentEvents([...currentEvents, eventWithId]); // Add the new task to the state.
      } catch (error) {
        console.error("Error adding task", error); // Handle error.
      }
    }
  };

  // Function to handle event click (for deletion).
  function handleEventClick(clickInfo) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove(); // Remove the event from the calendar.
    }
  }

  // Function to handle adding event to the database.
  function handleEventAdd(info) {
    const event = {
      title: info.event.title,
      description: info.event.extendedProps.description,
      status: info.event.extendedProps.status,
      deadline: info.event.start,
      id_user: info.event.extendedProps.id_user,
    };

    axios
      .post("http://localhost:5000/tasks", event) // Send the new event to the server.
      .then(() => {
        console.log("Event added to database successfully");
      })
      .catch((error) => console.error("Error adding event to database:", error));
  }

  // Function to handle event changes (for updates).
  function handleEventChange(info) {
    const { event } = info;
    axios
      .put(`http://localhost:5000/tasks/${event.id}`, event) // Send the updated event to the server.
      .then(() => {
        console.log("Event updated in database successfully");
      })
      .catch((error) => console.error("Error updating event in database:", error));
  }

  // Function to handle event removal.
  function handleEventRemove(info) {
    const { event } = info;
    axios
      .delete(`http://localhost:5000/tasks/${event.id}`, event) // Remove the event from the server.
      .then(() => {
        console.log("Event removed from database successfully");
      })
      .catch((error) => console.error("Error removing event from database:", error));
  }

  // Function to handle events set.
  function handleEvents(events) {
    setCurrentEvents(events);
  }

  // Function to render event content in the calendar.
  function renderEventContent(eventInfo) {
    return (
      <>
        <b className="mr-0.5">{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  // Sidebar component to display instructions and toggle for weekends visibility.
  function Sidebar({ weekendsVisible, handleWeekendsToggle, currentEvents }) {
    return (
      <div className="flex flex-row justify-center">
        <div className="p-8 content-start">
          <h2 className="font-semibold">Instructions</h2>
          <ul>
            <li>Déroulé pour voir le calendrier</li>
            <li>Cliqué sur une date pour ajouter un évènement</li>
            <li>Cliqué sur un évènement pour le supprimer</li>
          </ul>
          <div className="pt-2">
            <label className="font-semibold">
              <input
                type="checkbox"
                checked={weekendsVisible}
                onChange={handleWeekendsToggle}
              ></input>
              Weekends visible
            </label>
          </div>
        </div>
      </div>
    );
  }


  // Conditional rendering based on loading state.
  return (
    <div className="grid grid-rows-1 min-h-full text-sm">
      <Sidebar
        weekendsVisible={weekendsVisible}
        handleWeekendsToggle={handleWeekendsToggle}
        currentEvents={currentEvents}
        
      />
      <div className="grow p-12">
        {loading ? (
          <p>Loading...</p> // Show loading message while data is being fetched.
        ) : (
          <FullCalendar 
            
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Add plugins to the calendar.
            themeSystem='Slate'
            headerToolbar ={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth" // Set the initial view of the calendar.
            locale={frLocale}
           
            editable={true} // Make events editable.
            selectable={true} // Make dates selectable.
            selectMirror={true} // Show a "mirror" of the selection.
            dayMaxEvents={true} // Limit the number of events per day.
            weekends={weekendsVisible} // Show/hide weekends.
            initialEvents={currentEvents} // Set initial events.
            select={handleDateSelect} // Handle date selection.
            eventContent={renderEventContent} // Render custom event content.
            eventClick={handleEventClick} // Handle event click.
            eventsSet={handleEvents} // Set the events.
            eventAdd={handleEventAdd} // Handle event addition.
            eventChange={handleEventChange} // Handle event change.
            eventRemove={handleEventRemove} // Handle event removal.
          />
        )}
      </div>
    </div>
  );
}