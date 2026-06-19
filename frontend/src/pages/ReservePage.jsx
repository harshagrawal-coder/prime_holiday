import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUser, FaMapMarkerAlt, FaStar, FaCheck, FaArrowLeft, FaCreditCard, FaMobileAlt, FaWallet } from "react-icons/fa";
import toursData from "../data/toursData.json";

const countries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bahrain", "Bangladesh",
  "Belgium", "Bhutan", "Brazil", "Canada", "China", "Colombia", "Croatia", "Czech Republic",
  "Denmark", "Egypt", "Ethiopia", "Finland", "France", "Germany", "Greece", "Hong Kong",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Japan", "Jordan", "Kenya", "Kuwait", "Lebanon", "Malaysia", "Maldives", "Mexico", "Morocco",
  "Myanmar", "Nepal", "Netherlands", "New Zealand", "Nigeria", "Norway", "Oman", "Pakistan",
  "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Russia", "Saudi Arabia", "Singapore",
  "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Taiwan",
  "Thailand", "Turkey", "UAE", "United Kingdom", "United States", "Vietnam"
];

const ReservePage = () => {
  const [searchParams] = useSearchParams();
  const tourId = searchParams.get("tourId");
  const tours = toursData;
  
  const [selectedTour, setSelectedTour] = useState(null);
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    if (!tourId || !tours || tours.length === 0) {
      setSelectedTour(null);
      setIsSearching(false);
      return;
    }
    
    const normalizedId = String(tourId).trim();
    const found = tours.find(t => {
      if (!t) return false;
      const idStr = String(t.id).trim();
      return idStr === normalizedId || t.id === Number(normalizedId);
    });
    
    setSelectedTour(found || null);
    setIsSearching(false);
  }, [tourId, tours]);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    adults: 1,
    children: 0,
    startDate: "",
    endDate: "",
    pickupLocation: "",
    hotelPreference: "",
    specialRequests: "",
    paymentMethod: "upi",
    paymentType: "full",
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const getBasePrice = (tour) => {
    if (!tour) return 3000;
    if (tour.basePrice) return tour.basePrice;
    if (tour.priceRange) {
      const match = tour.priceRange.match(/(\d+)/);
      return match ? parseInt(match[1]) : 3000;
    }
    return 3000;
  };

  const hasTourId = tourId !== null;
  const isLoadingTours = !tours || tours.length === 0;
  const tourFound = !!selectedTour;
  const isLoading = isSearching || isLoadingTours;
  
  const tourData = selectedTour || {
    name: "Select a Tour",
    city: "Unknown",
    state: "Unknown",
    days: "N/A",
    rating: 0,
    image: "https://images.unsplash.com/photo-1562016600-ece13e8ba570?auto=format&fit=crop&w=200&q=80"
  };
  
  const basePrice = getBasePrice(tourData);

  const totalPeople = formData.adults + formData.children;

  const priceCalculation = useMemo(() => {
    const adultPrice = formData.adults * basePrice;
    const childPrice = formData.children * basePrice * 0.5;
    const total = adultPrice + childPrice;
    const advance = total * 0.3;

    return { adultPrice, childPrice, total, advance };
  }, [formData.adults, formData.children, basePrice]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) newErrors.phone = "Phone must be 10 digits";
    if (!formData.country) newErrors.country = "Country is required";
    if (formData.adults < 1) newErrors.adults = "At least 1 adult is required";
    if (!formData.startDate) newErrors.startDate = "Travel date is required";
    if (!formData.pickupLocation.trim()) newErrors.pickupLocation = "Pickup location is required";
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept terms & conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const bookingData = {
      tour: tourData.name,
      location: `${tourData.city}, ${tourData.state}`,
      duration: tourData.days,
      ...formData,
      totalPrice: priceCalculation.total,
      totalPeople,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    console.log("Booking Submitted:", bookingData);

    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 py-20">
        <div className="mx-auto max-w-2xl px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[2rem] border border-white/20 bg-white/10 p-12 text-center backdrop-blur-lg"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
              <FaCheck className="text-4xl text-emerald-400" />
            </div>
            <h2 className="text-3xl font-black uppercase italic text-white">Booking Submitted!</h2>
            <p className="mt-4 text-white/70">
              Thank you for your booking. We'll contact you within 24 hours to confirm your reservation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/tour"
                className="rounded-full bg-orange-500 px-8 py-3 text-sm font-black uppercase tracking-wider text-white"
              >
                Browse More Tours
              </Link>
              <Link
                to="/"
                className="rounded-full border border-white/30 px-8 py-3 text-sm font-black uppercase tracking-wider text-white"
              >
                Go Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-orange-50/60 via-white to-sky-50/40 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (hasTourId && !tourFound) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-orange-50/60 via-white to-sky-50/40 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8">
            <Link
              to="/tour"
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-600 hover:text-orange-600"
            >
              <FaArrowLeft /> Back to Tours
            </Link>
          </div>
          <div className="rounded-[2rem] border border-red-100 bg-red-50 p-8 text-center">
            <h2 className="text-2xl font-black uppercase text-red-600">Tour Not Found</h2>
            <p className="mt-2 text-slate-600">The tour you're looking for doesn't exist or has been removed.</p>
            <Link
              to="/tour"
              className="mt-6 inline-block rounded-full bg-orange-500 px-8 py-3 text-sm font-black uppercase tracking-wider text-white"
            >
              Browse Tours
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const paymentMethods = [
    { value: "upi", label: "UPI", icon: FaMobileAlt },
    { value: "card", label: "Card", icon: FaCreditCard },
    { value: "paylater", label: "Pay Later", icon: FaWallet }
  ];

  const paymentTypes = [
    { value: "full", label: "Full Payment", desc: "Pay entire amount" },
    { value: "advance", label: "30% Advance", desc: "Pay 30% now, rest later" }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50/60 via-white to-sky-50/40 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8">
          <Link
            to="/tour"
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-600 hover:text-orange-600"
          >
            <FaArrowLeft /> Back to Tours
          </Link>
        </div>

        <h1 className="text-4xl font-black uppercase italic text-slate-900 md:text-5xl">Reserve Your Trip</h1>
        <p className="mt-3 text-slate-600">Fill in the details to book your dream vacation</p>

        <form onSubmit={handleSubmit} className="mt-10">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="flex-1 space-y-6">
              {/* Tour Info Card */}
              <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] md:p-8">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1562016600-ece13e8ba570?auto=format&fit=crop&w=200&q=80"
                      alt={tourData.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase text-slate-900">{tourData.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      <FaMapMarkerAlt className="mr-1 inline text-orange-500" />
                      {tourData.city}, {tourData.state}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      <FaCalendarAlt className="mr-1 inline text-orange-500" />
                      {tourData.days}
                    </p>
                  </div>
                  <div className="ml-auto rounded-full bg-orange-500 px-3 py-1 text-sm font-black text-white">
                    <FaStar className="mr-1 inline text-yellow-300" />
                    {tourData.rating}
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] md:p-8">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-500">Personal Details</h3>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full rounded-xl border ${errors.fullName ? "border-red-500" : "border-slate-200"} bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-400`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full rounded-xl border ${errors.email ? "border-red-500" : "border-slate-200"} bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-400`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full rounded-xl border ${errors.phone ? "border-red-500" : "border-slate-200"} bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-400`}
                      placeholder="10-digit mobile number"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Country *</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full rounded-xl border ${errors.country ? "border-red-500" : "border-slate-200"} bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-400`}
                    >
                      <option value="">Select Country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country}</p>}
                  </div>
                </div>
              </div>

              {/* Travel Details */}
              <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] md:p-8">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-500">Travel Details</h3>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Adults *</label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:border-orange-500 hover:text-orange-500"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        name="adults"
                        value={formData.adults}
                        onChange={handleChange}
                        min="1"
                        className="w-20 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, adults: prev.adults + 1 }))}
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:border-orange-500 hover:text-orange-500"
                      >
                        +
                      </button>
                    </div>
                    {errors.adults && <p className="mt-1 text-xs text-red-500">{errors.adults}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Children</label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:border-orange-500 hover:text-orange-500"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        name="children"
                        value={formData.children}
                        onChange={handleChange}
                        min="0"
                        className="w-20 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, children: prev.children + 1 }))}
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:border-orange-500 hover:text-orange-500"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Travel Start Date *</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className={`w-full rounded-xl border ${errors.startDate ? "border-red-500" : "border-slate-200"} bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-400`}
                    />
                    {errors.startDate && <p className="mt-1 text-xs text-red-500">{errors.startDate}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Travel End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>
              </div>

              {/* Extra Details */}
              <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] md:p-8">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-500">Extra Details</h3>
                <div className="mt-6 space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Pickup Location *</label>
                    <input
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      className={`w-full rounded-xl border ${errors.pickupLocation ? "border-red-500" : "border-slate-200"} bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-400`}
                      placeholder="Hotel, Airport, Railway Station, etc."
                    />
                    {errors.pickupLocation && <p className="mt-1 text-xs text-red-500">{errors.pickupLocation}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Hotel Preference</label>
                    <select
                      name="hotelPreference"
                      value={formData.hotelPreference}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-400"
                    >
                      <option value="">Select Category</option>
                      <option value="budget">Budget (Economy)</option>
                      <option value="standard">Standard (3 Star)</option>
                      <option value="premium">Premium (4 Star)</option>
                      <option value="luxury">Luxury (5 Star)</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Special Requests</label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows={4}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-400"
                      placeholder="Any specific requirements or preferences..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Sticky */}
            <div className="w-full lg:w-[360px] space-y-6">
              <div className="sticky top-24 space-y-6">
                {/* Price Summary Card */}
                <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-800">Price Summary</h3>

                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Base Price (per person)</span>
                      <span className="font-bold text-slate-900">₹{basePrice.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-slate-100"></div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Adults × {formData.adults}</span>
                      <span className="font-bold text-slate-900">₹{priceCalculation.adultPrice.toLocaleString()}</span>
                    </div>
                    {formData.children > 0 && (
                      <>
                        <div className="border-t border-slate-100"></div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Children × {formData.children} (50%)</span>
                          <span className="font-bold text-slate-900">₹{priceCalculation.childPrice.toLocaleString()}</span>
                        </div>
                      </>
                    )}
                    <div className="border-t border-slate-100"></div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Total People</span>
                      <span className="font-bold text-slate-900">
                        <FaUser className="mr-1 inline" />
                        {totalPeople}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 border-t-2 border-slate-200 pt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-700">Total Price</span>
                      <span className="text-3xl font-black text-orange-600">₹{priceCalculation.total.toLocaleString()}</span>
                    </div>
                    {formData.paymentType === "advance" && (
                      <div className="mt-2 flex justify-between text-sm">
                        <span className="text-slate-500">Pay Now (30%)</span>
                        <span className="font-bold text-emerald-600">₹{priceCalculation.advance.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-800">Payment Method</h3>
                  <div className="mt-4 grid gap-3">
                    {paymentMethods.map(({ value, label, icon: Icon }) => (
                      <label
                        key={value}
                        className={`flex items-center gap-3 cursor-pointer rounded-xl border p-3 transition-all ${
                          formData.paymentMethod === value
                            ? "border-orange-500 bg-orange-50"
                            : "border-slate-200 hover:border-orange-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={value}
                          checked={formData.paymentMethod === value}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          formData.paymentMethod === value ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-500"
                        }`}>
                          <Icon size={16} />
                        </div>
                        <span className={`text-sm font-bold uppercase ${
                          formData.paymentMethod === value ? "text-orange-600" : "text-slate-700"
                        }`}>
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Payment Type */}
                <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-800">Payment Type</h3>
                  <div className="mt-4 grid gap-3">
                    {paymentTypes.map(option => (
                      <label
                        key={option.value}
                        className={`cursor-pointer rounded-xl border p-4 transition-all ${
                          formData.paymentType === option.value
                            ? "border-orange-500 bg-orange-50"
                            : "border-slate-200 hover:border-orange-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentType"
                          value={option.value}
                          checked={formData.paymentType === option.value}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <p className="font-bold text-slate-900">{option.label}</p>
                        <p className="text-xs text-slate-500">{option.desc}</p>
                      </label>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-orange-500 py-4 text-sm font-black uppercase tracking-wider text-white transition-all hover:bg-orange-600 disabled:opacity-50"
                  >
                    {isSubmitting ? "Processing..." : "Reserve Now"}
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-xl border border-slate-200 py-4 text-sm font-black uppercase tracking-wider text-slate-700 transition-all hover:border-orange-300"
                  >
                    Pay Later
                  </button>
                </div>

                {/* Terms & Conditions */}
                <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      className="mt-1 h-5 w-5 accent-orange-500"
                    />
                    <span className="text-sm text-slate-600">
                      I agree to the <Link to="#" className="text-orange-500 underline">Terms & Conditions</Link> and <Link to="#" className="text-orange-500 underline">Privacy Policy</Link>
                    </span>
                  </label>
                  {errors.termsAccepted && <p className="mt-2 text-xs text-red-500">{errors.termsAccepted}</p>}
                </div>

                <p className="text-center text-xs text-slate-400">
                  Secure payment via SSL encryption
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ReservePage;
