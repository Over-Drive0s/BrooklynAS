"use client";

import { FormEvent, useState } from "react";

export default function AdminLoginForm() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-white p-6 shadow-card md:p-8">
      <div className="space-y-5">
        <div>
          <label htmlFor="admin-user" className="mb-1.5 block text-sm font-semibold text-brand-black">
            User:
          </label>
          <input
            id="admin-user"
            name="user"
            type="text"
            autoComplete="username"
            value={user}
            onChange={(event) => setUser(event.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="admin-password" className="mb-1.5 block text-sm font-semibold text-brand-black">
            Password:
          </label>
          <input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={fieldClass}
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Sign In
        </button>
      </div>
    </form>
  );
}

const fieldClass =
  "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-brand-black placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red";
