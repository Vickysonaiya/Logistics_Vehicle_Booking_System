import React, { useState } from "react";

export default function SearchBook() {
  const [form, setForm] = useState({ capacityRequired: "", fromPincode: "", toPincode: "", startTime: "" });
  const [vehicles, setVehicles] = useState([]);
  const [msg, setMsg] = useState("");
  const [duration, setDuration] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams(form).toString();
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/vehicles/available?${params}`);
    const data = await res.json();
    setVehicles(data.vehicles || []);
    setDuration(data.estimatedRideDurationHours);
  }

  async function handleBook(vehicleId) {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, vehicleId, customerId: "DEMO-CUST-001" })
    });
    if (res.ok) {
      setMsg("Booking successful");
      handleSearch(new Event("submit"));
    } else {
      const err = await res.json();
      setMsg(err.error || "Failed");
    }
  }

  return (
    <div>
      <h2>Search & Book</h2>
      <form onSubmit={handleSearch}>
        <input placeholder="Capacity Required" value={form.capacityRequired} onChange={e => setForm({ ...form, capacityRequired: e.target.value })} /><br />
        <input placeholder="From Pincode" value={form.fromPincode} onChange={e => setForm({ ...form, fromPincode: e.target.value })} /><br />
        <input placeholder="To Pincode" value={form.toPincode} onChange={e => setForm({ ...form, toPincode: e.target.value })} /><br />
        <input type="datetime-local" value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })} /><br />
        <button type="submit">Search</button>
      </form>
      <p>{msg}</p>
      {duration && <p>Estimated Ride Duration: {duration} hours</p>}
      <ul>
        {vehicles.map(v => (
          <li key={v._id}>
            {v.name} - {v.capacityKg}kg - {v.tyres} tyres
            <button onClick={() => handleBook(v._id)}>Book Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
