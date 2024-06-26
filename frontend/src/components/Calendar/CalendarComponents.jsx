import { useState, useEffect, useRef } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId } from "./event-utils";
import frLocale from '@fullcalendar/core/locales/fr';
import './CalendarStyle.css';

export default function CalendarComponents() {
  // State variables
  const [weekendsVisible, setWeekendsVisible] = useState(true); // Toggle for weekends visibility
  const [currentEvents, setCurrentEvents] = useState([]); // List of current events
  const [loading, setLoading] = useState(true); // Loading state
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal visibility state for event update
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false); // Modal visibility state for task creation
  const [selectedEvent, setSelectedEvent] = useState(null); // Currently selected event
  const [newTask, setNewTask] = useState({ // State to store new task information
    title: "",
    description: "",
    status: "",
    deadline: "",
  });

  const calendarRef = useRef(null); // Ref for FullCalendar
  const updateModalRef = useRef(null); // Ref for update modal
  const createModalRef = useRef(null); // Ref for create modal

  // Function to fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      const tasks = response.data.map((task) => ({
        title: task.title,
        date: formatDate(task.deadline),
        id: task.id,
        status: task.status,
        description: task.description,
        id_user: task.id_user
      }));
      setCurrentEvents(tasks);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks", error);
      setLoading(false);
    }
  };

  // Call fetchTasks initially when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Scroll to the update modal when it opens
  useEffect(() => {
    if (modalIsOpen && updateModalRef.current) {
      updateModalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [modalIsOpen]);

  // Scroll to the create modal when it opens
  useEffect(() => {
    if (createModalIsOpen && createModalRef.current) {
      createModalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [createModalIsOpen]);

  // Function to format a date string to "YYYY-MM-DD"
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Function to format a date string to "YYYY-MM-DD HH:MM:SS"
  function formatDateTime(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // Function to toggle the visibility of weekends
  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  // Function to handle date selection for creating a new task
  const handleDateSelect = (selectInfo) => {
    setNewTask({
      ...newTask,
      deadline: formatDateTime(selectInfo.startStr), // Set the selected date as the deadline
    });
    setCreateModalIsOpen(true); // Open the modal for task creation
  };

  // Function to handle submitting the new task
  const handleCreateTask = async () => {
    const calendarApi = calendarRef.current.getApi();

    const task = {
      id: createEventId(),
      ...newTask,
      id_user: 22, // Assuming a fixed user ID for demonstration
    };

    calendarApi.addEvent(task); // Add the event to the calendar

    try {
      await axios.post("http://localhost:5000/tasks", task);
      fetchTasks(); // Fetch tasks after adding a new one
      setCreateModalIsOpen(false); // Close the modal
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  // Function to handle clicking on an event
  const handleEventClick = (clickInfo) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      description: clickInfo.event.extendedProps.description,
      status: clickInfo.event.extendedProps.status,
      start: clickInfo.event.start,
    });
    setModalIsOpen(true); // Open the modal for event update/delete
  };

  // Function to handle updating an event
  const handleEventUpdate = async () => {
    try {
      const updatedEvent = {
        ...selectedEvent,
        id_user: 22, // Assuming a fixed user ID for demonstration
        deadline: formatDateTime(selectedEvent.start) // Format the deadline correctly
      };

      await axios.put(`http://localhost:5000/tasks/${selectedEvent.id}`, updatedEvent);
      fetchTasks(); // Fetch tasks after updating an event
      setModalIsOpen(false); // Close the modal
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  // Function to handle deleting an event
  const handleEventDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the event '${selectedEvent.title}'`)) {
      try {
        await axios.delete(`http://localhost:5000/tasks/${selectedEvent.id}`);
        fetchTasks(); // Fetch tasks after deleting an event
        setModalIsOpen(false); // Close the modal
      } catch (error) {
        console.error("Error deleting task", error);
      }
    }
  };

  // Function to render the event content in the calendar
  function renderEventContent(eventInfo) {
    return (
      <>
        <b className="mr-0.5">{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  // Sidebar component for instructions and weekend toggle
  function Sidebar({ weekendsVisible, handleWeekendsToggle }) {
    return (
      <div className="flex flex-row justify-center">
        <div className="py-7 content-start text-center">
          <h2 className="font-semibold">Instructions</h2>
          <ul>
            <li>Scroll pour voir le calendrier</li>
            <li>Cliquer sur une date pour créer un event</li>
            <li>Cliquer sur un évènement pour le modifier ou le supprimer</li>
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

  return (
    <div className="grid grid-rows-1 min-h-full text-sm">
      <Sidebar
        weekendsVisible={weekendsVisible}
        handleWeekendsToggle={handleWeekendsToggle}
      />
      <div className="grow p-12">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <FullCalendar 
            ref={calendarRef} // Add ref to FullCalendar component
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            themeSystem={"Slate"}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            locale={frLocale}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            events={currentEvents}
            select={handleDateSelect}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
          />
        )}

        {modalIsOpen && (
          <div className="modal" ref={updateModalRef}> {/* Add ref to update modal */}
            <div className="modal-content p-4 flex flex-col bg-custom-main-orange m-3 rounded-lg">
              <h2 className="font-semibold text-xl pb-4">Update Task</h2>
              <label className="my-1">
                Title:
                <input
                  type="text"
                  value={selectedEvent?.title}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                  className="my-1 p-2 rounded"
                />
              </label>
              <label className="my-1">
                Description:
                <textarea
                  value={selectedEvent?.description}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
                  className="my-1 p-2 rounded"
                />
              </label>
              <label className="my-1">
                Status:
                <input
                  type="text"
                  value={selectedEvent?.status}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, status: e.target.value })}
                  className="my-1 p-2 rounded"
                />
              </label>
              <label className="my-1">
                Date:
                <input
                  type="datetime-local"
                  value={selectedEvent?.start ? formatDateTime(selectedEvent.start).substring(0, 16) : ''}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, start: e.target.value })}
                  className="my-1 p-2 rounded"
                />
              </label>
              <button onClick={handleEventUpdate} className="my-2 bg-caramel w-1/3 text-white font-normal">
                Update
              </button>
              <button onClick={handleEventDelete} className="my-2 bg-caramel w-1/3 text-white font-normal">
                Delete
              </button>
              <button onClick={() => setModalIsOpen(false)} className="my-2 bg-caramel w-1/3 text-white font-normal">
                Close
              </button>
            </div>
          </div>
        )}

        {createModalIsOpen && (
          <div className="modal" ref={createModalRef}> {/* Add ref to create modal */}
            <div className="modal-content p-4 flex flex-col bg-custom-main-orange m-3 rounded-lg">
              <h2 className="font-semibold text-xl pb-4">Create Task</h2>
              <label className="my-1">
                Title:
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="my-1 p-2 rounded"
                />
              </label>
              <label className="my-1">
                Description:
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="my-1 p-2 rounded"
                />
              </label>
              <label className="my-1">
                Status:
                <input
                  type="text"
                  value={newTask.status}
                  onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                  className="my-1 p-2 rounded"
                />
              </label>
              <label className="my-1">
                Date:
                <input
                  type="datetime-local"
                  value={newTask.deadline ? newTask.deadline.substring(0, 16) : ''}
                  onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                  className="my-1 p-2 rounded"
                />
              </label>
              <button onClick={handleCreateTask} className="my-2 bg-caramel w-1/3 text-white font-normal">
                Create
              </button>
              <button onClick={() => setCreateModalIsOpen(false)} className="my-2 bg-caramel w-1/3 text-white font-normal">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
