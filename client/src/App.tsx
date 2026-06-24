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


import LandingPage from "@/pages/public/LandingPage"
import UnauthorizedPage from "@/pages/public/UnauthorizedPage"
import NotFoundPage from "@/pages/public/NotFoundPage"

import HomePage from "@/pages/private/HomePage";
import EventFormPage from "@/pages/private/EventFormPage";
import MyRegistrationsPage from "@/pages/private/MyRegistrationsPage";
import MyEventsPage from "@/pages/private/MyEventsPage";

import AdminUsers from "./pages/private/AdminUsers";

import CategoriesPage from "./pages/private/admin/CategoriesPage";
import { AdminDashboardPage, AdminEventsPage, AdminUsersPage } from "@/pages/private/admin";

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
          <Route path='my-events' element={<MyEventsPage />} />
          <Route path='my-events/create-event' element={<EventFormPage />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route path='/admin' element={<AuthGuard type="admin" />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="events" element={<AdminEventsPage />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="attendances" element={<AttendancesPage />} />
          <Route path="categories" element={<CategoriesPage />} />
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