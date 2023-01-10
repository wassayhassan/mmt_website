import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import { gapi } from 'gapi-script'
import moment from 'moment';
import { GoogleLogin } from 'react-google-login'

import "../../App.css";


moment.locale('en-GB');
const localizer = momentLocalizer(moment)

function T_calendar() {

  var CLIENT_ID = "208805948909-71msnhkgi8b0drrbbi7pldbiepmdv194.apps.googleusercontent.com"
  var API_KEY = "AIzaSyD3G8BkHDwOnzKOzAyZhQfMu2-gaS88h1c"
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  var SCOPES = "https://www.googleapis.com/auth/calendar.events"

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState("");
  const [start_time, setstime] = useState("");
  const [end_time, setetime] = useState("");
  const [g_events, setg_events] = useState("");

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  function eventStyleGetter(event) {
    console.log(event);
  }

  function build_calendar(events) {
    var eventlst = [];
    for(var i = 0; i < events.length; i++) {
      var event = {id: "", title: "", start: "", end: "", owner: "", status: "", description: ""}
      event.id = events[i].id;
      event.title = events[i].summary;
      event.start = events[i].start.dateTime;
      event.end = events[i].end.dateTime;
      event.owner = events[i].organizer.email;
      event.status = events[i].status;
      event.description = events[i].description;
      eventlst.push(event);
    }
    console.log("==>",eventlst);
    setg_events(eventlst);
    console.log("=>",g_events);
  }

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({
        client_id: CLIENT_ID,
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      gapi.auth2.getAuthInstance().signIn()
        .then(() => {
          gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
          }).then(response => {
            const events = response.result.items
            build_calendar(events)
            console.log('EVENTS: ', events)
          })
        })

    })
  }, [])

  return (
    <div>
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
        <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
        <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
        <p>Start time</p> <TimePicker onChange={setstime} value={start_time} />
        <p>End time</p> <TimePicker onChange={setetime} value={end_time} />
        <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
          BTN Add Event
        </button>
      </div>
      <Calendar 
        localizer={localizer} 
        events={g_events}
        onSelectEvent={(eventStyleGetter)}
        defaultDate={new Date()}
        defaultView="month"
        startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
}

export default T_calendar;