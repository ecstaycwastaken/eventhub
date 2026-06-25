import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import { Toaster } from 'sonner';

import AuthGuard from "@/components/auth/AuthGuard"
import AuthProvider from "@/context/auth/AuthProvider";

import LandingLayout from "@/layouts/LandingLayout"
import AdminLayout from "./layouts/AdminLayout";
import HomeLayout from "./layouts/HomeLayout";
import EventsLayout from "./layouts/EventsLayout";

import LandingPage from "@/pages/public/LandingPage"
import UnauthorizedPage from "@/pages/public/UnauthorizedPage"
import NotFoundPage from "@/pages/public/NotFoundPage"

import HomePage from "@/pages/private/HomePage";
import EventFormPage from "@/pages/private/events/EventFormPage";
import MyRegistrationsPage from "@/pages/private/MyRegistrationsPage";
import MyEventsPage from "@/pages/private/MyEventsPage";
import EditMyEventPage from "@/pages/private/events/EditMyEventPage";
import CheckInPage from "@/pages/private/events/CheckInPage";
import ReportsPage from "@/pages/private/events/ReportsPage";


import { 
  AdminAttendancesPage,
  AdminCategoriesPage,
  AdminDashboardPage, 
  AdminEventsPage, 
  AdminUsersPage, 
  AdminEditEventPage 
} from "@/pages/private/admin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route path='/' element={<LandingLayout />}>
        <Route index element={<LandingPage />} />
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
    </>
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