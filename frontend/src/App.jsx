import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/complaints")
        .then((response) => setComplaints(response.data))
        .catch((error) => console.error(error));
  }, []);

  return (
      <div style={{ padding: "20px" }}>
        <h1>Community Problem Portal</h1>

        {complaints.map((complaint) => (
            <div key={complaint.id}>
              <h3>{complaint.title}</h3>
              <p>{complaint.description}</p>
              <p>Location: {complaint.location}</p>
              <p>Status: {complaint.status}</p>
            </div>
        ))}
      </div>
  );
}

export default App;