import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PageLoader from "./components/ui/PageLoader";
import AdminLayout from "./admin/layout/AdminLayout";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetailsPage = lazy(() => import("./pages/BlogDetailsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const TourPage = lazy(() => import("./pages/TourPage"));
const TourDetailsPage = lazy(() => import("./pages/TourDetailsPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));

const AdminLoginPage = lazy(() => import("./admin/pages/Login"));
const AdminDashboardPage = lazy(() => import("./admin/pages/Dashboard"));
const AdminBookingsPage = lazy(() => import("./admin/pages/Bookings"));
const AdminToursPage = lazy(() => import("./admin/pages/Tours"));
const AdminAddTourPage = lazy(() => import("./admin/pages/AddTour"));
const AdminBlogPage = lazy(() => import("./admin/pages/Blog"));
const AdminAddBlogPage = lazy(() => import("./admin/pages/AddBlog"));
const AdminUsersPage = lazy(() => import("./admin/pages/Users"));
const AdminMessagesPage = lazy(() => import("./admin/pages/Messages"));
const AdminGalleryPage = lazy(() => import("./admin/pages/Gallery"));
const AdminSettingsPage = lazy(() => import("./admin/pages/Settings"));
const AdminTestimonialsPage = lazy(() => import("./admin/pages/Testimonials"));
const AdminCategoriesPage = lazy(() => import("./admin/pages/Categories"));
const AdminCouponsPage = lazy(() => import("./admin/pages/Coupons"));
const AdminReviewsPage = lazy(() => import("./admin/pages/Reviews"));
const AdminActivityPage = lazy(() => import("./admin/pages/ActivityLogs"));
const AdminAnalyticsPage = lazy(() => import("./admin/pages/Analytics"));
const AdminNotificationsPage = lazy(() => import("./admin/pages/Notifications"));

// Master Data
const AdminMasterDataPage = lazy(() => import("./admin/pages/MasterData"));
const AdminRegionsPage = lazy(() => import("./admin/pages/Regions"));
const AdminStatesPage = lazy(() => import("./admin/pages/States"));
const AdminCitiesPage = lazy(() => import("./admin/pages/Cities"));
const AdminMoodsPage = lazy(() => import("./admin/pages/Moods"));
const AdminDurationsPage = lazy(() => import("./admin/pages/Durations"));

// User Dashboard
const UserLayout = lazy(() => import("./user/layout/UserLayout"));
const DashboardHome = lazy(() => import("./user/pages/DashboardHome"));
const Bookings = lazy(() => import("./user/pages/Bookings"));
const SavedTrips = lazy(() => import("./user/pages/SavedTrips"));
const Profile = lazy(() => import("./user/pages/Profile"));

const ReservePage = lazy(() => import("./pages/ReservePage"));

const PublicApp = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogDetailsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/tour" element={<TourPage />} />
      <Route path="/tours" element={<TourPage />} />
      <Route path="/tour/:id" element={<TourDetailsPage />} />
      <Route path="/tours/:id" element={<TourDetailsPage />} />
      <Route path="/reserve" element={<ReservePage />} />
      <Route path="/gallery" element={<GalleryPage />} />
    </Routes>
  </MainLayout>
);

const UserApp = () => (
  <Routes>
    <Route path="/" element={<UserLayout />}>
      <Route index element={<DashboardHome />} />
      <Route path="bookings" element={<Bookings />} />
      <Route path="saved" element={<SavedTrips />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  </Routes>
);

const AdminApp = () => (
  <Routes>
    <Route path="login" element={<AdminLoginPage />} />
    <Route path="" element={<AdminLayout />}>
      <Route index element={<AdminDashboardPage />} />
      <Route path="bookings" element={<AdminBookingsPage />} />
      <Route path="tours" element={<AdminToursPage />} />
      <Route path="tours/new" element={<AdminAddTourPage />} />
      <Route path="blog" element={<AdminBlogPage />} />
      <Route path="blog/new" element={<AdminAddBlogPage />} />
      <Route path="testimonials" element={<AdminTestimonialsPage />} />
      <Route path="categories" element={<AdminCategoriesPage />} />
      <Route path="gallery" element={<AdminGalleryPage />} />
      <Route path="coupons" element={<AdminCouponsPage />} />
      <Route path="reviews" element={<AdminReviewsPage />} />
      <Route path="users" element={<AdminUsersPage />} />
      <Route path="messages" element={<AdminMessagesPage />} />
      <Route path="activity" element={<AdminActivityPage />} />
      <Route path="analytics" element={<AdminAnalyticsPage />} />
      <Route path="notifications" element={<AdminNotificationsPage />} />
      <Route path="settings" element={<AdminSettingsPage />} />

      {/* Master Data */}
      <Route path="masterdata" element={<AdminMasterDataPage />} />
      <Route path="masterdata/regions" element={<AdminRegionsPage />} />
      <Route path="masterdata/states" element={<AdminStatesPage />} />
      <Route path="masterdata/cities" element={<AdminCitiesPage />} />
      <Route path="masterdata/moods" element={<AdminMoodsPage />} />
      <Route path="masterdata/durations" element={<AdminDurationsPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/admin" replace />} />
  </Routes>
);

const App = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="/dashboard/*" element={<UserApp />} />
      <Route path="/*" element={<PublicApp />} />
    </Routes>
  </Suspense>
);

export default App;
