import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URI } from "../../config/config";
const USER_STORAGE_KEY = "prime-holiday-user-auth";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullname, email, password, confirmPassword } = formData;

    if (
      !fullname.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await fetch(`${API_URI}/api/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
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
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.userData));
      navigate("/", { replace: true });
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
            Join Prime Holiday
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
            Create your account
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Start planning your dream journey today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-orange-300 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-orange-300 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min. 6 characters"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-orange-300 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-orange-300 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-orange-500 hover:text-orange-600"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
