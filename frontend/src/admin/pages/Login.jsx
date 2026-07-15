import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URI } from "../../config/config";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setError("value should be fill");
  };
 const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Email and password are required.");
      return;
    }
    const { email, password } = formData;
    try {
      const response = await fetch(`${API_URI}/api/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("USER_STORAGE_KEY", JSON.stringify(data.userData));
      navigate("/admin", { replace: true });
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/95 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.25)]">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.32em] text-orange-500">
            Admin Access
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
            Sign in to Dashboard
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Manage tours, bookings, and content from the Prime Holiday admin
            panel.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Admin email"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-orange-300 focus:ring-2 focus:ring-orange-500/20"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-orange-300 focus:ring-2 focus:ring-orange-500/20"
          />

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          ) : null}

          <button className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600">
            Login
          </button>
        </form>

        <div className="mt-6 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
          Demo login:{" "}
          <span className="font-semibold text-slate-900">
            admin@primeholiday.com / admin123
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
