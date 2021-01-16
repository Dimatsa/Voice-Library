import React, { useState, useEffect } from "react";
import axios from "axios";

export default () => {
  const [message, setMessage] = useState("");

  useEffect(
    () =>
      axios
        .get("/api/message")
        .then((response) => response.data)
        .then((data) => setMessage(data)),
    []
  );

  return (
    <div>
      <h2>{message}</h2>
      <form
        action="/api/uploadaudio"
        encType="multipart/form-data"
        method="POST"
      >
        <input type="file" name="audio" accept="audio/*" />
        <input type="submit" value="Upload a file" />
      </form>
    </div>
  );
};
