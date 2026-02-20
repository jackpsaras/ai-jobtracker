// frontend/src/App.jsx

import JobForm from './components/JobForm';
import JobList from './components/JobList';

function App() {
  const [refresh, setRefresh] = useState(0);  // To trigger list refresh

  return (
    <div>
      <h1>JobTrackr Pro</h1>
      <JobForm onJobAdded={() => setRefresh(refresh + 1)} />
      <JobList key={refresh} />  // Key forces re-fetch
    </div>
  );
}

export default App;