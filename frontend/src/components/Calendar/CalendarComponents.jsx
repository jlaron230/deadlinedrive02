// Importing necessary libraries and components from React, axios, and FullCalendar
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'

// Define the main CalendarComponents function
export default function CalendarComponents() {
  // State to manage visibility of weekends and current events
  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState([])

  console.log("currenteevent avant fetch",currentEvents);

  // Fetch tasks when the component is mounted
  useEffect(() => {
    fetchTasks();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      const tasks = response.data.map(task => ({
        title: task.title,
        date: formatDate(task.deadline), // Utiliser la fonction formatDate ici
        id: task.id,
        // description: task.description,
        // status: task.status,
        // assuming deadline is used as the event date
        // allDay: true, // you can change this based on your data
        // extendedProps: {
        //   id_user: task.id_user
        // }
        
      }));
      
      setCurrentEvents(tasks);
      console.log(currentEvents.date);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };
  



  // Toggle the visibility of weekends
  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible)
  }

  // Function to handle the selection of a date to add a new event
  const handleDateSelect = async (selectInfo) => {
    let title = prompt('Give a title to your task!')
    let description = prompt('Describe your task')
    let status = prompt("What is its status?")
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      let task = {
        id: createEventId(),
        title,
        description: description,
        status: status,
        start: selectInfo.startStr,
        id_user: 10,
      }
      calendarApi.addEvent(task);
      
      try {
        const response = await axios.post('http://localhost:5000/tasks', task);
        const eventWithId = { ...task, id: response.data.id };
        setCurrentEvents([...currentEvents, eventWithId]);
      } catch (error) {
        console.error('Error adding task', error);
      }
    }
    console.log("curreventEvent après handle", currentEvents);
  }

  // Function to handle the click event to delete an event
  function handleEventClick(clickInfo) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }


  // Function to handle the addition of an event
  function handleEventAdd(info) {

    const event = {
    title: info.event.title,
     description : info.event.extendedProps.description,
     status : info.event.extendedProps.status, 
     deadline : info.event.start,
     id_user : info.event.extendedProps.id_user
    }

    

    axios.post('http://localhost:5000/tasks', event)
      .then(() => {
        console.log('Event added to database successfully');
      })
      .catch(error => console.error('Error adding event to database:', error));
  }

  // Function to handle the change of an event
  function handleEventChange(info) {
    const { event } = info;
    axios.put(`http://localhost:5000/tasks/${event.id}`, event)
      .then(() => {
        console.log('Event updated in database successfully');
      })
      .catch(error => console.error('Error updating event in database:', error));
  }

  // Function to handle the removal of an event
  function handleEventRemove(info) {
    const { event } = info;
    axios.delete(`http://localhost:5000/tasks/${event.id}`, event)
      .then(() => {
        console.log('Event removed from database successfully');
      })
      .catch(error => console.error('Error removing event from database:', error));
  }

  // Function to handle the setting of events
  function handleEvents(events) {
    setCurrentEvents(events)
  }

  

  // Function to render the content of an event
  function renderEventContent(eventInfo) {
 
    return (
      <>
        <b className="mr-0.5">{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

 

  // Sidebar component to display instructions and the list of events
  function Sidebar({ weekendsVisible, handleWeekendsToggle, currentEvents }) {
    return (
      <div className="flex flex-row justify-center">
        <div className="p-8 content-start">
          <h2 className="font-semibold">Instructions</h2>
          <ul>
            <li>Click on a date to add an event</li>
            <li>Drag and drop functionality available</li>
            <li>Click on an event to delete it</li>
          </ul>
          <div className="p-8">
            <label className="font-semibold">
              <input
                type='checkbox'
                checked={weekendsVisible}
                onChange={handleWeekendsToggle}
              ></input>
              Show weekends
            </label>
          </div>
        </div>
        <div className="p-8">
          <h2 className="font-semibold">All Events ({currentEvents.length})</h2>
          <ul>
            {currentEvents.map((event) => (
              <SidebarEvent key={event.id} event={event} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  // Component to render individual events in the sidebar
  function SidebarEvent({ event }) {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
        <i>{event.title}</i>
      </li>
    )
  }

  // Render the calendar and sidebar
  return (
    <div className="grid grid-rows-1 min-h-full text-sm">
      <Sidebar
        weekendsVisible={weekendsVisible}
        handleWeekendsToggle={handleWeekendsToggle}
        currentEvents={currentEvents}
      />
      <div className="grow p-12">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents= {currentEvents} // alternatively, use the `events` setting to fetch from a feed

          // base:{INITIAL_EVENTS} alternatively, use the events setting to fetch from a feed = where the task is show
          // [
          // { title: 'event 1', date: '2024-06-01' },
          // { title: 'event 2', date: '2024-06-02' }]
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          //for the database
          eventAdd={handleEventAdd}
          eventChange={handleEventChange}
          eventRemove={handleEventRemove}
        />
      </div>
    </div>
  )
}
