import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

export const contactDetails = [
  {
    title: "Visit Us",
    value: "Connaught Place, New Delhi, India",
    icon: FaMapMarkerAlt,
  },
  {
    title: "Call Us",
    value: "+91 98765 43210",
    icon: FaPhoneAlt,
  },
  {
    title: "Email Us",
    value: "hello@primeholiday.in",
    icon: FaEnvelope,
  },
];

export const quickContactOptions = [
  {
    title: "Call Us",
    description: "Talk to a travel expert for quick trip planning and pricing help.",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    icon: FaPhoneAlt,
  },
  {
    title: "WhatsApp",
    description: "Share your travel dates and destination ideas for a faster response.",
    value: "Message instantly",
    href: "https://wa.me/919876543210",
    icon: FaWhatsapp,
  },
  {
    title: "Email Support",
    description: "Best for custom itineraries, hotel requests, and group travel plans.",
    value: "hello@primeholiday.in",
    href: "mailto:hello@primeholiday.in",
    icon: FaEnvelope,
  },
];

export const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebookF,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: FaYoutube,
  },
];

export const contactHighlights = [
  "Tailor-made itineraries for couples, families, and groups",
  "Transparent pricing with destination-first suggestions",
  "Support before, during, and after your journey",
];
