import EventBrowser from "@/components/EventBrowser"

const LandingPage = () => {
  return (
    <EventBrowser 
      mainTitle={
        <>
          Your next great <br /> experience is here.
        </>
      }
      subTitle="Hundreds of events across tech, design, business, and community — free to browse, easy to join."
      showStats={true}
    />
  )
}

export default LandingPage