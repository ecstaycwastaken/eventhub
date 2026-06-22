import Button from "@/components/Button"
import { useAuth } from "@/context/AuthContext"

const HomePage = () => {
  const { logout } = useAuth()

  return (
    <>
      <div>HomePage</div>
      <Button
        bgColorClass="bg-brand-red"
        className="px-4 py-2 text-button-md rounded"
        onClick={logout}
      >
        Logout
      </Button>
    </>
  )
}

export default HomePage