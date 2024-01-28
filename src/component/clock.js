import React, { useEffect, useState } from "react";

export const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [countdownTime, setCountdownTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const { day, hour, min, sec } = calculateTimeDifference();
      
      // Check if countdown has reached zero or become negative
      if (day <= 0 && hour <= 0 && min <= 0 && sec <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  
    return () => {
      clearInterval(interval);
    };
  }, [currentTime, countdownTime]);

  function Format() {
    let hours = currentTime.getHours();
    let min = currentTime.getMinutes();
    let sec = currentTime.getSeconds();
    const form = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${PaddZero(hours)}:${PaddZero(min)}:${PaddZero(sec)} ${form}`;
  }

  function PaddZero(number) {
    return number < 10 ? "0" + number : number;
  }

  const countdownSet = () => {
    const inp = document.getElementById("set-count").value;
   const lab=document.getElementById('label')
   lab.innerHTML=inp;
    // Validate the input and set countdownTime
    const parsedDate = new Date(inp);
    if (!isNaN(parsedDate.getTime())) {
      setCountdownTime(parsedDate);
    } 
    else {
      alert("Invalid date format. Please use MM/DD/YY");
    }
    // Clear the input field
    // document.getElementById("set-count").value = '';
  };
  
  const calculateTimeDifference = () => {
    const diff = countdownTime - currentTime;
    const s = 1000;
    const m = s * 60;
    const h = m * 60;
    const d = h * 24;
    const day = Math.floor(diff / d);
    const hour = Math.floor((diff % d) / h);
    const min = Math.floor((diff % h) / m);
    const sec = Math.floor((diff % m) / s);
    return { day, hour, min, sec };
  };
  
  const { day, hour, min, sec } = calculateTimeDifference();
  
  return (
    <div className="clock-container">
      <div className="clock">
        <span>{Format()}</span>
      </div>
      <div className="countdown">
        <span>countdown</span><br></br>
        <input type="text" placeholder="MM/DD/YY" id="set-count" /><br/>
        <button onClick={countdownSet}>set countdown</button>
        <div id="label"></div>
        <div>
          <span id="day" className="big-text">{PaddZero(day)} </span>days:
          <span id="hours" className="big-text">{PaddZero(hour)}</span>hours:
          <span id="min" className="big-text">{PaddZero(min)}</span>min:
          <span id="sec" className="big-text">{PaddZero(sec)}</span> sec
        </div>
      </div>
    </div>
  );
}