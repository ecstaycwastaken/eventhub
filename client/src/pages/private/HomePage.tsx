import { useAuth } from "@/hooks/useAuth";
import EventBrowser from "@/components/event-browser"

const HomePage = () => {
  const { user } = useAuth()

  const firstName = user?.first_name || 'User'

  return (
    <>
      <EventBrowser 
        greeting={`HELLO, ${firstName} 👋`}
        mainTitle="What are you looking for?"
        showStats={false}
      />
    </>
  )
}

export default HomePage