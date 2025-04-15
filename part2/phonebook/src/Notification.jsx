import React from "react";
import "./App.css";

function Notification({ success, message }) {
  if (message === null) {
    return null
  }

  return (
    <div className={success == true ? "success" : "error"}>
      {message}
    </div>
  )
}

export default Notification;
