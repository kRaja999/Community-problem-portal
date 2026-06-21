import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8080/api/complaints";

function App() {
  const [role, setRole] = useState("citizen");
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    department: "",
    photo: null,
  });

  const fetchComplaints = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setComplaints(data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const detectCategory = (text) => {
    const t = text.toLowerCase();

    if (t.includes("water") || t.includes("pipe")) return "Water Supply";
    if (t.includes("light") || t.includes("street")) return "Street Light";
    if (t.includes("road") || t.includes("pothole")) return "Roads & Transport";
    if (t.includes("garbage") || t.includes("waste")) return "Sanitation";
    if (t.includes("drainage") || t.includes("sewage")) return "Drainage";
    if (t.includes("electricity") || t.includes("power")) return "Electricity";
    if (t.includes("traffic")) return "Traffic Management";
    if (t.includes("tree")) return "Parks & Environment";
    if (t.includes("mosquito")) return "Public Health";

    return "General Civic Issue";
  };

  const assignDepartment = (text) => {
    const t = text.toLowerCase();

    if (t.includes("road") || t.includes("pothole") || t.includes("footpath")) {
      return "Roads & Transport Department";
    }

    if (t.includes("water") || t.includes("pipe")) {
      return "Water Supply Department";
    }

    if (t.includes("light") || t.includes("electricity") || t.includes("power")) {
      return "Electricity Department";
    }

    if (t.includes("garbage") || t.includes("waste") || t.includes("sanitation")) {
      return "Sanitation Department";
    }

    if (t.includes("drainage") || t.includes("sewage")) {
      return "Drainage Department";
    }

    if (t.includes("traffic") || t.includes("signal")) {
      return "Traffic Management Department";
    }

    if (t.includes("tree") || t.includes("park")) {
      return "Parks & Environment Department";
    }

    if (t.includes("mosquito") || t.includes("health")) {
      return "Public Health Department";
    }

    if (t.includes("animal")) {
      return "Animal Welfare Department";
    }

    if (t.includes("noise")) {
      return "Pollution Control Department";
    }

    return "General Administration Department";
  };

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      const file = e.target.files[0];
      setForm({ ...form, photo: file });
      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      const updated = { ...form, [e.target.name]: e.target.value };
      const combinedText = updated.title + " " + updated.description;

      updated.category = detectCategory(combinedText);
      updated.department = assignDepartment(combinedText);

      setForm(updated);
    }
  };

  const useCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = `${pos.coords.latitude}, ${pos.coords.longitude}`;
          setForm({ ...form, location: loc });
        },
        () => alert("Location permission denied.")
    );
  };

  const submitComplaint = async (e) => {
    e.preventDefault();

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        location: form.location,
      }),
    });

    alert(
        `Request submitted successfully.\nAssigned Department: ${form.department || "General Administration Department"}`
    );

    setForm({
      title: "",
      description: "",
      location: "",
      category: "",
      department: "",
      photo: null,
    });

    setPreview(null);
    fetchComplaints();
  };

  const updateStatus = async (id, status) => {
    await fetch(`${API_URL}/${id}/status?status=${status}`, {
      method: "PUT",
    });

    alert(`Request marked as ${status}`);
    fetchComplaints();
  };

  const deleteComplaint = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    fetchComplaints();
  };

  const filteredComplaints = complaints.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <div className="app">
        <header className="hero">
          <h1>COMMUNITY-PROBLEM-PORTAL</h1>
          <p>One Platform for Community Services, Support and Citizen Engagement</p>

          <div className="top-actions">
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="citizen">Citizen View</option>
              <option value="admin">Admin Dashboard</option>
            </select>
          </div>
        </header>

        <section className="stats">
          <div className="stat-card">
            <p>Total Requests</p>
            <h2>{complaints.length}</h2>
          </div>

          <div className="stat-card">
            <p>Pending</p>
            <h2>{complaints.filter((c) => c.status === "PENDING").length}</h2>
          </div>

          <div className="stat-card">
            <p>Resolved</p>
            <h2>{complaints.filter((c) => c.status === "RESOLVED").length}</h2>
          </div>
        </section>

        <main className="grid">
          <section className="card">
            <h2>Community Service Request</h2>

            <form onSubmit={submitComplaint}>
              <label>Service Type</label>
              <select
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
              >
                <option value="">Select Service Type</option>
                <option value="Road Damage / Potholes">Road Damage / Potholes</option>
                <option value="Road Maintenance Request">Road Maintenance Request</option>
                <option value="Broken Footpath">Broken Footpath</option>
                <option value="Water Leakage">Water Leakage</option>
                <option value="Water Supply Interruption">Water Supply Interruption</option>
                <option value="Street Light Not Working">Street Light Not Working</option>
                <option value="Electricity Problem">Electricity Problem</option>
                <option value="Garbage Collection Issue">Garbage Collection Issue</option>
                <option value="Illegal Dumping">Illegal Dumping</option>
                <option value="Drainage Blockage">Drainage Blockage</option>
                <option value="Sewage Overflow">Sewage Overflow</option>
                <option value="Traffic Signal Issue">Traffic Signal Issue</option>
                <option value="Tree Obstruction">Tree Obstruction</option>
                <option value="Mosquito Breeding Area">Mosquito Breeding Area</option>
                <option value="Public Safety Concern">Public Safety Concern</option>
                <option value="Animal Nuisance">Animal Nuisance</option>
                <option value="Noise Pollution">Noise Pollution</option>
                <option value="Damaged Public Property">Damaged Public Property</option>
                <option value="Community Event Support">Community Event Support</option>
                <option value="Volunteer Registration">Volunteer Registration</option>
                <option value="Emergency Support">Emergency Support</option>
                <option value="Other Civic Issue">Other Civic Issue</option>
              </select>

              <label>AI Category</label>
              <input value={form.category} readOnly placeholder="Auto detected" />

              <label>Assigned Department</label>
              <input
                  value={form.department}
                  readOnly
                  placeholder="Auto assigned department"
              />

              <label>Description</label>
              <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Explain the request clearly"
                  required
              />

              <label>Location</label>
              <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Example: Kukatpally, Hyderabad"
                  required
              />

              <button type="button" onClick={useCurrentLocation}>
                Use Current Location
              </button>

              <label>Upload / Capture Photo</label>
              <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
              />

              {preview && (
                  <img
                      src={preview}
                      className="preview"
                      alt="Request preview"
                  />
              )}

              <button type="submit">Submit Request</button>
            </form>
          </section>

          <section className="card">
            <div className="records-head">
              <h2>{role === "admin" ? "Admin Dashboard" : "Service Records"}</h2>

              <input
                  type="text"
                  className="search"
                  placeholder="Search service records..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {filteredComplaints.map((item) => (
                <div className="complaint" key={item.id}>
                  <div>
                    <h3>{item.title}</h3>

                    <p>
                      <strong>Request ID:</strong> #{item.id}
                    </p>

                    <p>{item.description}</p>

                    <strong>Location:</strong> {item.location}
                    <br />

                    <span className={`status ${item.status?.toLowerCase()}`}>
                  {item.status}
                </span>
                  </div>

                  {role === "admin" && (
                      <div className="admin-actions">
                        <button
                            className="resolve-btn"
                            onClick={() => updateStatus(item.id, "RESOLVED")}
                        >
                          Mark Resolved
                        </button>

                        <button
                            className="delete"
                            onClick={() => deleteComplaint(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                  )}
                </div>
            ))}
          </section>
        </main>
      </div>
  );
}

export default App;