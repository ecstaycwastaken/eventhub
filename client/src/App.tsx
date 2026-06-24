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

import HomePage from "@/pages/private/HomePage"
import MyEventsPage from "@/pages/private/MyEventsPage"

import AdminUsers from "./pages/private/AdminUsers";

import AdminDashboardPage from "./pages/private/admin/DashboardPage";
import AdminEventsPage from "./pages/private/admin/EventsPage";
import AttendancesPage from "./pages/private/admin/AttendancesPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthGuard />}>
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="events" element={<AdminEventsPage />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="attendances" element={<AttendancesPage />} />
        </Route>
      </Route>

      {/* Public Routes */}
      <Route path='/' element={<LandingLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      {/* Private Routes */}
      <Route element={<AuthGuard />}>
        <Route path='/home' element={<HomeLayout />}>
          <Route path='events' element={<HomePage />} />
          <Route path='my-events' element={<MyEventsPage />} />
        </Route>
      </Route>
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