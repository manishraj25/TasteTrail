import { useState } from "react";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    window.location.href = "/";
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold">Login</h2>
      <input className="input" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="input" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="btn" onClick={submit}>Login</button>
    </div>
  );
}
