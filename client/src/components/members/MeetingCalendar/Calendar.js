import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { useAuth } from "../../../context/AuthContext";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./styles.css";

function Calendar() {
  const { currentUser } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };
  const handleSelect = ({ selection }) => {
    setStartDate(selection.startDate);
    setEndDate(selection.endDate);
  };
  return (
    <div class="d-flex justify-content-center mt-5">
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
        // minDate={new Date()}
        // maxDate={new Date()}
        // scroll={{ enabled: false }}
        rangeColors={currentUser.admin ? ["#f06292"] : ["#fff"]}
        disabledDates={[new Date(2020, 11, 11)]}
      />
    </div>
  );
}

export default Calendar;
