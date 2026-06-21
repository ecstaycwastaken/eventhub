import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";

import AuthGuard from "@/components/auth/AuthGuard"
import AuthProvider from "@/context/AuthContext";

import LandingLayout from "@/layouts/LadingLayout"
import LandingPage from "@/pages/public/LandingPage"

import HomePage from "@/pages/private/HomePage"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      /* Public Routes */
      <Route path='/' element={<LandingLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      /* Private Routes */
      <Route element={<AuthGuard />}>
        <Route path='/home' element={<HomePage />} />
      </Route>
    </>
  )
)

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App