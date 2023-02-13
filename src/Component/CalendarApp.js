import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const locales = {
  "en-IN": require("date-fns/locale/en-IN"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [];

export default function CalendarApp() {
  // const [newEvent, setNewEvent] = React.useState(localStorage.getItem('newEvent') === 'true');
  const [newEvent, setNewEvent] = React.useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const Event1 = new Date(allEvents[i].start);
      const Event2 = new Date(newEvent.start);
      const Event3 = new Date(allEvents[i].end);
      const Event4 = new Date(newEvent.end);
      if (
        ((Event1 <= Event2) && (Event2 <= Event3)) || ((Event1 <= Event4) &&
          (Event4 <= Event3))
      ) {
        break;
      }
    }
    setAllEvents([...allEvents, newEvent]);
    localStorage.setItem('newEvent', newEvent);
  }

  return (
    <div className="App">
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
        {/* date picker */}
        <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
        <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
        <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Add Event
        </button>
        {/* date picker */}
      </div>
      {/* calendar start*/}
      <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end"
        style={{ height: 400, marginLeft: "260px", marginRight: "260px" }} />
        {/* calendar end */}
    </div>
  );
}

