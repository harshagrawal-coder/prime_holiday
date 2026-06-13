import {
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Tours", path: "/tour" },
  { label: "Gallery", path: "/gallery" },
  { label: "Blog", path: "/blog" },
];

export const companyLinks = [
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Terms & Conditions", path: "/terms" },
];

export const socialLinks = [
  { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
];

export const contactItems = [
  {
    icon: FaMapMarkerAlt,
    label: "Delhi, India",
    href: "https://maps.google.com/?q=Delhi,+India",
  },
  {
    icon: FaPhoneAlt,
    label: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: HiOutlineMail,
    label: "hello@primeholiday.in",
    href: "mailto:hello@primeholiday.in",
  },
];
