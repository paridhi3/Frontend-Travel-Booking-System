// import React, { useState } from "react";
// import dayjs from "dayjs";
// import "./HorizontalDatePicker.css";

// const HorizontalDatePicker = ({ onSelectDate }) => {
//   const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));

//   const dates = Array.from({ length: 10 }, (_, index) =>
//     dayjs().add(index, "day").format("YYYY-MM-DD")
//   );

//   const handleDateClick = (date) => {
//     setSelectedDate(date);
//     if (onSelectDate) onSelectDate(date);
//   };

//   return (
//     <div className="date-picker-container">
//       <div className="date-scroll">
//         {dates.map((date) => (
//           <div
//             key={date}
//             className={`date-item ${selectedDate === date ? "selected" : ""}`}
//             onClick={() => handleDateClick(date)}
//           >
//             <span className="day">{dayjs(date).format("ddd")}</span>
//             <span className="date">{dayjs(date).format("DD")}</span>
//             <span className="month">{dayjs(date).format("MMM")}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HorizontalDatePicker;

import React, { useState } from "react";
import dayjs from "dayjs";
import "./HorizontalDatePicker.css";

const HorizontalDatePicker = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const today = dayjs();
  const maxSelectableDate = today.add(6, "day").format("YYYY-MM-DD"); // 6th day from today

  const dates = Array.from({ length: 10 }, (_, index) =>
    today.add(index, "day").format("YYYY-MM-DD")
  );

  const handleDateClick = (date) => {
    if (date > maxSelectableDate) return; // Prevent selection
    setSelectedDate(date);
    if (onSelectDate) onSelectDate(date);
  };

  return (
    <div className="date-picker-container">
      <div className="date-scroll">
        {dates.map((date) => {
          const isDisabled = date > maxSelectableDate;
          return (
            <div
              key={date}
              className={`date-item ${selectedDate === date ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
              onClick={() => handleDateClick(date)}
            >
              <span className="day">{dayjs(date).format("ddd")}</span>
              <span className="date">{dayjs(date).format("DD")}</span>
              <span className="month">{dayjs(date).format("MMM")}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalDatePicker;
