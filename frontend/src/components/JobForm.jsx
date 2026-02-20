// frontend/src/components/JobForm.jsx

import { useState } from "react";
import api from "../api";

export default function JobForm({ onJobAdded }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/jobs", { company, role, status })
      .then(() => {
        onJobAdded();  // Callback to refresh list
        setCompany("");
        setRole("");
      })
      .catch(err => console.error("Add job error", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={e => setCompany(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={e => setRole(e.target.value)}
        required
      />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option>Applied</option>
        <option>Interviewed</option>
        <option>Rejected</option>
      </select>
      <button type="submit">Add Job</button>
    </form>
  );
}