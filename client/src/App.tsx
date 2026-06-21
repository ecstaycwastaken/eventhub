import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/public/HomePage"
import AdminLayout from "./layouts/AdminLayout";
import { AdminPage } from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<AdminPage />} />
      </Route>
    </>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App