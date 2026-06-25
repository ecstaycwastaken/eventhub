import { Outlet, useLocation } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

function HomeLayout() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith('/u/my-events');

  return (
    <>
        <Navbar />
            <Outlet />
        {!hideFooter && <Footer />}
    </>
  )
}

export default HomeLayout