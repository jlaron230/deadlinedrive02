import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' 
import CalendarComponents from '@components/Calendar/CalendarComponents'
import NavBar from "@components/NavBar/NavBar";
import Footer from "@components/Footer/Footer";


export default function Calendar (){
    return (
       <>
       <NavBar />
       <CalendarComponents />
       <Footer/>
       </> 
    )
}

