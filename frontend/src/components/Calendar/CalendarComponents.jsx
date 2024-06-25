import { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId } from "./event-utils";
import frLocale from '@fullcalendar/core/locales/fr';
import './CalendarStyle.css';

export default function CalendarComponents() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

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

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  const handleDateSelect = async (selectInfo) => {
    let title = prompt("Donnez un titre à votre tâche!");
    let description = prompt("Décrivez votre tâche !");
    let status = prompt("Quel est son status ?");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      let task = {
        id: createEventId(),
        title,
        description: description,
        status: status,
        deadline: formatDateTime(selectInfo.startStr),
        id_user: 22,
      };
      calendarApi.addEvent(task);

      try {
        const response = await axios.post("http://localhost:5000/tasks", task);
        fetchTasks(); // Fetch tasks after adding a new one
      } catch (error) {
        console.error("Error adding task", error);
      }
    }
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      description: clickInfo.event.extendedProps.description,
      status: clickInfo.event.extendedProps.status,
      start: clickInfo.event.start,
    });
    setModalIsOpen(true);
  };

  const handleEventUpdate = async () => {
    try {
      const updatedEvent = {
        ...selectedEvent,
        id_user: 22,
        deadline: formatDateTime(selectedEvent.start)
      };

      await axios.put(`http://localhost:5000/tasks/${selectedEvent.id}`, updatedEvent);
      fetchTasks(); // Fetch tasks after updating an event
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const handleEventDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the event '${selectedEvent.title}'`)) {
      try {
        await axios.delete(`http://localhost:5000/tasks/${selectedEvent.id}`);
        fetchTasks(); // Fetch tasks after deleting an event
        setModalIsOpen(false);
      } catch (error) {
        console.error("Error deleting task", error);
      }
    }
  };

  function renderEventContent(eventInfo) {
    return (
      <>
        <b className="mr-0.5">{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  function Sidebar({ weekendsVisible, handleWeekendsToggle }) {
    return (
      <div className="flex flex-row justify-center">
        <div className="py-7 content-start text-center">
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
          <div className="modal">
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
      </div>
    </div>
  );
}
