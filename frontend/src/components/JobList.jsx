// frontend/src/components/JobList.jsx
import { useEffect, useState } from "react";
import api from "../api";

export default function JobList({ onJobDeleted }) {  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get("/jobs")
      .then(res => {
        setJobs(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch jobs error:", err);
        setJobs([]);
        setLoading(false);
      });
  }, [onJobDeleted]);   //refetch when a delete happens
  // Delete handler with confirmation
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job application?")) return;

    try {
      await api.delete(`/jobs/${id}`);
      onJobDeleted();   // tell parent to refresh
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Could not delete job");
    }
  };

  if (loading) return <p>Loading applications...</p>;

  if (jobs.length === 0) {
    return <p>No applications yet — add one above!</p>;
  }
  //  list of jobs with delete buttons
  return (
    <ul>
      {jobs.map(job => (
        <li key={job.id}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>{job.company}</strong> — {job.role}
              <span style={{ marginLeft: '12px', color: '#444' }}>
                ({job.status}) — {new Date(job.applied_date).toLocaleDateString()}
              </span>
            </div>
            <button
              onClick={() => handleDelete(job.id)}
              style={{
                background: '#e74c3c',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}