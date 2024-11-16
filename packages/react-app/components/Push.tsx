"use client";

import React, { useState } from "react";
import { sendPushNotification } from "../lib/pushNotifications";

const NotificationForm: React.FC = () => {
  const [title, setTitle] = useState<string>("Hello World Notification");
  const [body, setBody] = useState<string>(
    "Web3 native notifications are here!"
  );
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    setFeedback("");

    try {
      await sendPushNotification({ title, body });
      setFeedback("Notification sent successfully!");
    } catch (error) {
      setFeedback("Failed to send notification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Send Notification</h1>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Body:
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </label>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Sending..." : "Send Notification"}
      </button>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default NotificationForm;
