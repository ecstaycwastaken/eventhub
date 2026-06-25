import { lazy, Suspense } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet
} from "react-router-dom";
import { Toaster } from 'sonner';

import { Spinner } from "@/components/ui/spinner";

import AuthGuard from "@/components/auth/AuthGuard"
import AuthProvider from "@/context/auth/AuthProvider";

import LandingLayout from "@/layouts/LandingLayout"
import PublicLayout from "@/layouts/PublicLayout"
import AdminLayout from "./layouts/AdminLayout";
import HomeLayout from "./layouts/HomeLayout";
import EventsLayout from "./layouts/EventsLayout";

const LandingPage = lazy(() => import("@/pages/public/LandingPage"));
const UnauthorizedPage = lazy(() => import("@/pages/public/UnauthorizedPage"));
const NotFoundPage = lazy(() => import("@/pages/public/NotFoundPage"));
const AboutPage = lazy(() => import("@/pages/public/AboutPage"));
const ContactPage = lazy(() => import("@/pages/public/ContactPage"));
const PrivacyPage = lazy(() => import("@/pages/public/PrivacyPage"));

const HomePage = lazy(() => import("@/pages/private/HomePage"));
const EventFormPage = lazy(() => import("@/pages/private/events/EventFormPage"));
const MyRegistrationsPage = lazy(() => import("@/pages/private/MyRegistrationsPage"));
const MyEventsPage = lazy(() => import("@/pages/private/MyEventsPage"));
const EditMyEventPage = lazy(() => import("@/pages/private/events/EditMyEventPage"));
const CheckInPage = lazy(() => import("@/pages/private/events/CheckInPage"));
const ReportsPage = lazy(() => import("@/pages/private/events/ReportsPage"));

const AdminAttendancesPage = lazy(() => import("@/pages/private/admin/AttendancesPage"));
const AdminCategoriesPage = lazy(() => import("@/pages/private/admin/CategoriesPage"));
const AdminDashboardPage = lazy(() => import("@/pages/private/admin/DashboardPage"));
const AdminEventsPage = lazy(() => import("@/pages/private/admin/EventsPage"));
const AdminUsersPage = lazy(() => import("@/pages/private/admin/UsersPage"));
const AdminEditEventPage = lazy(() => import("@/pages/private/admin/EditEventPage"));

const GlobalSuspenseFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB]">
    <Spinner size="lg" />
  </div>
);

const SuspenseLayout = () => (
  <Suspense fallback={<GlobalSuspenseFallback />}>
    <Outlet />
  </Suspense>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<SuspenseLayout />}>
      {/* Public Routes */}
      <Route path='/' element={<LandingLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      <Route element={<PublicLayout />}>
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/privacy' element={<PrivacyPage />} />
      </Route>

      <Route path='/unauthorized' element={<UnauthorizedPage />} />

      {/* Private Routes */}
      <Route path='/u' element={<AuthGuard type="user" />}>
        <Route element={<HomeLayout />}>
          <Route path='events' element={<HomePage />} />
          <Route path='my-registrations' element={<MyRegistrationsPage />} />

          <Route path='my-events' element={<EventsLayout />}>
            <Route index element={<MyEventsPage />} />
            <Route path='check-in' element={<CheckInPage />} />
            <Route path='reports' element={<ReportsPage />} />
          </Route>
          
          <Route path='my-events/create-event' element={<EventFormPage />} />
          <Route path='my-events/edit/:id' element={<EditMyEventPage />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route path='/admin' element={<AuthGuard type="admin" />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="events" element={<AdminEventsPage />} />
          <Route path="events/edit/:id" element={<AdminEditEventPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="attendances" element={<AdminAttendancesPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
        </Route>
      </Route>

      {/* Wildcard 404 Route */}
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
)

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />

      <Toaster 
        position="top-right"
        duration={3000}
        closeButton
        dir="ltr"
        richColors
      />
    </AuthProvider>
  )
}

export default App