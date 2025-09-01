import React, { useState } from "react";

export default function AddVehicle() {
  const [form, setForm] = useState({ name: "", capacityKg: "", tyres: "" });
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/vehicles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setMsg("Vehicle added successfully");
      } else {
        const err = await res.json();
        setMsg(err.error || "Failed");
      }
    } catch (err) {
      setMsg(err.message);
    }
  }

  return (
    <div>
      <h2>Add Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /><br />
        <input placeholder="Capacity Kg" type="number" value={form.capacityKg} onChange={e => setForm({ ...form, capacityKg: e.target.value })} /><br />
        <input placeholder="Tyres" type="number" value={form.tyres} onChange={e => setForm({ ...form, tyres: e.target.value })} /><br />
        <button type="submit">Submit</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
