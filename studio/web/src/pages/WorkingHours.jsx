import { useState } from "react";
import moment from "moment";

const WorkingHours = () => {
  const [startM, setStartM] = useState("");
  const [endM, setEndM] = useState("");
  var startTimeM = moment(startM, "hh:mm");
  var endTimeM = moment(endM, " hh:mm");
  var diffM = endTimeM.diff(startTimeM, "hours", true) || 0;

  const [startT, setStartT] = useState("");
  const [endT, setEndT] = useState("");
  var startTimeT = moment(startT, "hh:mm");
  var endTimeT = moment(endT, " hh:mm");
  var diffT = endTimeT.diff(startTimeT, "hours", true) || 0;

  const [startW, setStartW] = useState("");
  const [endW, setEndW] = useState("");
  var startTimeW = moment(startW, "hh:mm");
  var endTimeW = moment(endW, " hh:mm");
  var diffW = endTimeW.diff(startTimeW, "hours", true) || 0;

  const [startTu, setStartTu] = useState("");
  const [endTu, setEndTu] = useState("");
  var startTimeTu = moment(startTu, "hh:mm");
  var endTimeTu = moment(endTu, " hh:mm");
  var diffTu = endTimeTu.diff(startTimeTu, "hours", true) || 0;

  const [startF, setStartF] = useState("");
  const [endF, setEndF] = useState("");
  var startTimeF = moment(startF, "hh:mm");
  var endTimeF = moment(endF, " hh:mm");
  var diffF = endTimeF.diff(startTimeF, "hours", true) || 0;

  return (
    <div className="container mx-auto my-5 p-6 bg-white rounded shadow-md">
      {/* Header Row */}
      <div className="grid grid-cols-4 gap-4 text-center font-semibold mb-2">
        <div></div>
        <div>Start</div>
        <div>End</div>
        <div>Working Hours</div>
      </div>

      {/* Days & Inputs */}
      {[
        { day: "Monday", start: setStartM, end: setEndM, diff: diffM },
        { day: "Tuesday", start: setStartT, end: setEndT, diff: diffT },
        { day: "Wednesday", start: setStartW, end: setEndW, diff: diffW },
        { day: "Thursday", start: setStartTu, end: setEndTu, diff: diffTu },
        { day: "Friday", start: setStartF, end: setEndF, diff: diffF },
      ].map(({ day, start, end, diff }) => (
        <div key={day} className="grid grid-cols-4 gap-4 items-center mb-2">
          <label className="text-gray-700 font-medium">{day}</label>
          <input
            type="time"
            className="border rounded px-3 py-2 focus:ring focus:border-blue-300"
            onChange={(e) => start(e.target.value)}
          />
          <input
            type="time"
            className="border rounded px-3 py-2 focus:ring focus:border-blue-300"
            onChange={(e) => end(e.target.value)}
          />
          <div>{diff}</div>
        </div>
      ))}

      <hr className="my-4" />

      {/* Total Hours */}
      <div className="grid grid-cols-4 gap-4 items-center">
        <label className="text-gray-700 font-medium">Total Hours</label>
        <div></div>
        <div></div>
        <div>{(diffM + diffT + diffW + diffTu + diffF).toFixed(2)}</div>
      </div>
    </div>
  );
};

export default WorkingHours;
