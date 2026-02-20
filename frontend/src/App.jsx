// frontend/src/App.jsx

import { useState } from 'react';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import './styles.css';

function App() {
  const [refresh, setRefresh] = useState(0);  // To trigger list refresh

  return (
    <div>
      <h1>JobTrackr Pro</h1>
      <JobForm onJobAdded={() => setRefresh(refresh + 1)} />
      <h3>My Applications</h3>
      <JobList onJobDeleted={() => setRefresh(refresh + 1)} />
    </div>
  );
}

export default App;