import { useAuth } from "@/context/AuthContext"
import EventBrowser from "@/components/EventBrowser";

const HomePage = () => {
  const { user } = useAuth()

  const firstName = user?.first_name || 'User';

  return (
    <EventBrowser 
      greeting={`HELLO, ${firstName} 👋`}
      mainTitle="What are you looking for?"
      showStats={false}
    />
  )
}

export default HomePage