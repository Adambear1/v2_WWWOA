import React, { useState, useMemo } from "react";
import { DateRangePicker } from "react-date-range";
import { useAuth } from "../../../context/AuthContext";
import Modal from "./Modal";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./styles.css";
import FormDate from "../../../utils/FormDate";
import FormTime from "../../../utils/FormTime";
import API from "../../../utils/API";

function Calendar() {
  const { currentUser } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [disabledDates, setDisabledDates] = useState([]);
  const [time, setTime] = useState([]);
  const [open, setOpen] = useState(false);
  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };

  useMemo(() => {
    API.GetAllMeetings().then(({ data }) => {
      let timeArr = [];
      let dateArr = [];
      data.map(({ date, endTime, startTime }) => {
        timeArr.push(`${FormTime(startTime)}-${FormTime(endTime)}`);
        dateArr.push(new Date(date));
      });
      setTime(timeArr);
      setDisabledDates(dateArr);
    });
  }, [currentUser]);
  for (
    let i = 0;
    i < document.querySelectorAll(".rdrDayDisabled").length;
    i++
  ) {
    document.querySelectorAll(".rdrDayDisabled")[i].id = i;
  }
  useMemo(() => {
    try {
      if (currentUser.admin === true && startDate === endDate) {
        setTimeout(() => {
          setOpen(true);
        }, 200);
      }
    } catch ({ message }) {
      console.log(message);
    }
  }, [startDate]);
  const handleSelect = ({ selection }) => {
    setStartDate(selection.startDate);
    setEndDate(selection.endDate);
  };
  return (
    <div class="d-flex justify-content-center mt-5">
      <div
        class="calendar-container"
        onMouseOver={(e) => {
          if (
            e.target.classList.contains("rdrDayDisabled") ||
            e.target.parentNode.classList.contains("rdrDayDisabled") ||
            e.target.parentNode.parentNode.classList.contains("rdrDayDisabled")
          ) {
            if (e.target.id) {
              e.target.title = `Meeting Day!
                  ${FormDate(disabledDates[e.target.id])}
                    ${time[e.target.id]}
                  `;
            }
            if (e.target.parentNode.id) {
              e.target.title = `Meeting Day!
                  ${FormDate(disabledDates[e.target.parentNode.id])}
                    ${time[e.target.parentNode.id]}
                  `;
            }
            if (e.target.parentNode.parentNode.id) {
              e.target.title = `Meeting Day!
                  ${FormDate(disabledDates[e.target.parentNode.parentNode.id])}
                    ${time[e.target.parentNode.parentNode.id]}
                  `;
            }
          }
        }}
      >
        <Modal
          open={open}
          setOpen={setOpen}
          date={new Date(startDate).toString()}
          currentUser={currentUser}
        />
        <DateRangePicker
          ranges={[selectionRange]}
          onChange={handleSelect}
          rangeColors={
            currentUser.admin === true ? ["#f06292"] : ["#ffffff", "#222"]
          }
          disabledDates={disabledDates}
        />
      </div>
    </div>
  );
}

export default Calendar;
