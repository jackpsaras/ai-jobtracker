// frontend/src/components/JobList.jsx

import { useEffect, useState } from "react";
import api from "../api";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    api.get("/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.error("Fetch jobs error", err));
  };

  return (
    <ul>
      {jobs.map(job => (
        <li key={job.id}>
          {job.company} - {job.role} ({job.status})
        </li>
      ))}
    </ul>
  );
}