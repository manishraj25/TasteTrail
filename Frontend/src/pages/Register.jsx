import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({});

  const submit = async () => {
    await api.post("/auth/register", form);
    window.location.href = "/login";
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold">Register</h2>
      <input className="input" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input className="input" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="input" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className="btn" onClick={submit}>Register</button>
    </div>
  );
}
