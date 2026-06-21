import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/public/HomePage"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App