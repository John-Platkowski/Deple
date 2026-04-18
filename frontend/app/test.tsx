"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/hello")
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return <div>{message}</div>;
}