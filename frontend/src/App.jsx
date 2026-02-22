// frontend/src/App.jsx

import { useState } from 'react';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import './styles.css';
import Dashboard from './components/Dashboard';

function App() {
  const [refresh, setRefresh] = useState(0);  // To trigger list refresh

  return (
    <div className="container">
      <main className="card">
        <header className="app-header">
          <div>
            <h1 className="app-title">JobTrackr Pro</h1>
            <p style={{margin:0, color:'#4a5568'}}>Track your applications in one place</p>
          </div>
        </header>

        <section style={{marginTop: '1rem'}}>
          <JobForm onJobAdded={() => setRefresh(refresh + 1)} />
        </section>

        <section className="job-list" style={{marginTop:'1rem'}}>
          <h3 style={{marginTop:0}}>My Applications</h3>
          <JobList refresh={refresh} onJobDeleted={() => setRefresh(refresh + 1)} />
        </section>
      </main>

      <aside className="card dashboard-card">
        <h3 style={{marginTop:0}}>Dashboard</h3>
        <Dashboard refresh={refresh} />
      </aside>
    </div>
  );
}

export default App;