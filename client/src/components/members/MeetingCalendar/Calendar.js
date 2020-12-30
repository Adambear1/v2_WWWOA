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
import SpecModal from "./SpecModal";

function Calendar() {
  const { currentUser } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [disabledDates, setDisabledDates] = useState([]);
  const [time, setTime] = useState([]);
  const [location, setLocation] = useState([]);
  const [open, setOpen] = useState(false);
  const [specOpen, setSpecOpen] = useState(false);
  const [specDate, setSpecDate] = useState("");
  const [specTime, setSpecTime] = useState("");
  const [specLocation, setSpecLocation] = useState("");
  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };

  useMemo(() => {
    API.GetAllMeetings().then(({ data }) => {
      let timeArr = [];
      let dateArr = [];
      let locationArr = [];
      data.map(({ date, endTime, startTime, location }) => {
        timeArr.push(`${FormTime(startTime)}-${FormTime(endTime)}`);
        dateArr.push(new Date(date));
        locationArr.push(location);
      });
      setTime(timeArr);
      setDisabledDates(dateArr);
      setLocation(locationArr);
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
      if (
        (currentUser.admin === true || currentUser.admin === "true") &&
        startDate === endDate
      ) {
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

  console.log(location && location);
  return (
    <div class="d-flex justify-content-center mt-5">
      <SpecModal
        open={specOpen}
        setOpen={setSpecOpen}
        date={specDate}
        time={specTime}
        location={specLocation}
      />
      <Modal
        open={open}
        setOpen={setOpen}
        date={new Date(startDate).toString()}
        currentUser={currentUser}
      />
      <div
        class="calendar-container"
        onMouseOver={(e) => {
          if (
            e.target.classList.contains("rdrDayDisabled") ||
            e.target.parentNode.classList.contains("rdrDayDisabled") ||
            e.target.parentNode.parentNode.classList.contains("rdrDayDisabled")
          ) {
            if (e.target.id) {
              e.target.title = `Meeting Day!On ${FormDate(
                disabledDates[e.target.id]
              )} from ${time[e.target.id]} at ${location[e.target.id]}
                  `;
            }
            if (e.target.parentNode.id) {
              e.target.title = `Meeting Day! On ${FormDate(
                disabledDates[e.target.parentNode.id]
              )} from ${time[e.target.parentNode.id]} at ${
                location[e.target.parentNode.id]
              }
                  `;
            }
            if (e.target.parentNode.parentNode.id) {
              e.target.title = `Meeting Day! On ${FormDate(
                disabledDates[e.target.parentNode.parentNode.id]
              )} from ${time[e.target.parentNode.parentNode.id]} at ${
                location[e.target.parentNode.parentNode.id]
              }
                  `;
            }
          }
        }}
        onClick={(e) => {
          if (
            e.target.classList.contains("rdrDayDisabled") ||
            e.target.parentNode.classList.contains("rdrDayDisabled") ||
            e.target.parentNode.parentNode.classList.contains("rdrDayDisabled")
          ) {
            if (e.target.parentNode.parentNode.id) {
              setSpecDate(
                FormDate(disabledDates[e.target.parentNode.parentNode.id])
              );
              setSpecTime(time[e.target.parentNode.parentNode.id]);
              setSpecLocation(location[e.target.parentNode.parentNode.id]);
            }
            if (e.target.parentNode.id) {
              setSpecDate(FormDate(disabledDates[e.target.parentNode.id]));
              setSpecTime(time[e.target.parentNode.id]);
              setSpecLocation(location[e.target.parentNode.id]);
            }
            if (e.target.id) {
              setSpecDate(FormDate(disabledDates[e.target.id]));
              setSpecTime(time[e.target.id]);
              setSpecLocation(location[e.target.id]);
            }
            setSpecOpen(true);
          }
        }}
      >
        <DateRangePicker
          ranges={[selectionRange]}
          onChange={handleSelect}
          rangeColors={
            currentUser.admin === true || currentUser.admin === "true"
              ? ["#f06292"]
              : ["#ffffff", "#222"]
          }
          disabledDates={disabledDates}
        />
      </div>
    </div>
  );
}

export default Calendar;
