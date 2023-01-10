import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "./calendar.css";
 import "react-calendar/dist/Calendar.css";


function M_calendar() {
  const [value, onChange] = useState(new Date());

  return (
    <div className=''>
      <Calendar
        onChange={onChange}
        value={value}
        className=''
      />
    </div>
  );
}
export default M_calendar;