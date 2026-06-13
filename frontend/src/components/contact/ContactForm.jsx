import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import toursData from "../../data/toursData.json";

const initialState = {
  name: "",
  email: "",
  phone: "",
  destination: "",
  travelDate: "",
  message: "",
};

const ContactForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState({});

  const destinations = useMemo(
    () => [...new Set(toursData.map((item) => item.name))].sort((a, b) => a.localeCompare(b)),
    []
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSubmitted(false);
  };

  const handleFocus = (name) => setFocused((prev) => ({ ...prev, [name]: true }));
  const handleBlur = (name) => setFocused((prev) => ({ ...prev, [name]: false }));

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Required";
    if (!formData.email.trim()) nextErrors.email = "Required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) nextErrors.email = "Invalid email";
    if (!formData.phone.trim()) nextErrors.phone = "Required";
    if (!formData.message.trim()) nextErrors.message = "Required";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setSubmitted(true);
    setFormData(initialState);
  };

  return (
    <motion.div
      id="contact-form"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto max-w-[680px]"
    >
      <div className="overflow-hidden rounded-2xl border border-orange-100/50 bg-white/80 shadow-[0_10px_30px_rgba(249,115,22,0.08)] backdrop-blur-sm">
        <div className="border-b border-orange-100/30 bg-gradient-to-r from-orange-50/50 to-amber-50/30 px-6 py-5">
          <h2 className="text-xl font-bold text-gray-900">Send Us a Message</h2>
          <p className="mt-1 text-sm text-gray-500">We&apos;ll get back to you within 24 hours</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-7">
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={() => handleBlur("name")}
                  className={`w-full rounded-xl border bg-orange-50/30 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 ${
                    errors.name
                      ? "border-red-300 focus:border-red-500"
                      : "border-orange-200/50 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  className={`w-full rounded-xl border bg-orange-50/30 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 ${
                    errors.email
                      ? "border-red-300 focus:border-red-500"
                      : "border-orange-200/50 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => handleFocus("phone")}
                  onBlur={() => handleBlur("phone")}
                  className={`w-full rounded-xl border bg-orange-50/30 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 ${
                    errors.phone
                      ? "border-red-300 focus:border-red-500"
                      : "border-orange-200/50 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              <select
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="w-full rounded-xl border border-orange-200/50 bg-orange-50/30 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              >
                <option value="">Preferred Destination</option>
                {destinations.map((destination) => (
                  <option key={destination} value={destination}>
                    {destination}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <input
                type="date"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-orange-200/50 bg-orange-50/30 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
              <div className="flex items-center rounded-xl border border-orange-100/50 bg-orange-50/20 px-4 py-3 text-xs text-gray-500">
                <svg className="mr-2 h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Flexible dates? Mention in message
              </div>
            </div>

            <div className="relative">
              <textarea
                name="message"
                rows="4"
                placeholder="Tell us about your trip, budget, group size..."
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus("message")}
                onBlur={() => handleBlur("message")}
                className={`w-full rounded-xl border bg-orange-50/30 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 ${
                  errors.message
                    ? "border-red-300 focus:border-red-500"
                    : "border-orange-200/50 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                } min-h-[120px] resize-none`}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-500">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="group w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:shadow-orange-500/30"
            >
              Send Inquiry
              <svg className="ml-2 inline-block h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Inquiry sent successfully!
            </motion.div>
          ) : null}
        </form>
      </div>
    </motion.div>
  );
};

export default ContactForm;
