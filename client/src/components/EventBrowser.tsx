import { useEffect, useState } from 'react'
import heroBG from '@/assets/hero-bg.png'
import Button from '@/components/Button'
import EventCard, { type  EventItem } from '@/components/EventCard'

interface EventBrowserProps {
    greeting?: string;
    mainTitle: React.ReactNode;
    subTitle?: string;
    showStats?: boolean;
}

function EventBrowser({ greeting, mainTitle, subTitle, showStats = false }: EventBrowserProps) {
    const [events, setEvents] = useState<EventItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const totalEvents = events.length
    const totalCategories = new Set(events.map((event) => event.category.id)).size

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/v1/event')
        .then((res) => {
            if (!res.ok) throw new Error('Failed to fetch events.')
            return res.json()
        })
        .then((responseData) => {
            const eventsArray = Array.isArray(responseData) ? responseData : responseData.events
            setEvents(eventsArray || [])
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }, []);

    const categories = [
        { id: 'all', name: 'All', color: '#000000' },
        ...Array.from(new Map(events.map((event) => [event.category.id, event.category])).values()),
    ];

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center px-4 py-24 text-center sm:px-6 lg:px-8"
        style={{ backgroundImage: `url(${heroBG})` }}
      >
        <div className="relative z-10">
          {greeting ? (
            <p className="mx-auto mb-4 max-w-xl text-sm font-bold tracking-widest text-white uppercase">
              {greeting}
            </p>
          ) : (
            <p className="mx-auto mb-4 max-w-xl text-sm tracking-widest text-gray-300 sm:text-base">
              DISCOVER · REGISTER · ATTEND
            </p>
          )}

          {/* 3. Inject the dynamic main title */}
          <h1 className="mx-auto max-w-3xl text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {mainTitle}
          </h1>

          {subTitle && (
            <p className="mx-auto mt-4 max-w-xl text-sm text-gray-300 sm:text-base">
              {subTitle}
            </p>
          )}

          <div className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-xl bg-white p-2 shadow">
            <input
              className="min-w-0 flex-1 rounded-lg px-4 py-3 outline-none"
              placeholder="Search events, workshops, meetups..."
            />
            <Button bgColorClass="bg-brand-red" className="shrink-0 rounded-lg px-4 py-3 sm:px-6 text-white">
              Search
            </Button>
          </div>
        </div>
      </div>

      {showStats && (
        <div className="grid grid-cols-2 gap-4 bg-neutral-900 px-4 py-6 text-center text-white md:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold sm:text-2xl"> {totalEvents} </h3>
            <p className="text-xs uppercase">Events</p>
          </div>
          <div>
            <h2 className="text-xl font-bold sm:text-2xl"> 12K+ </h2>
            <p className="text-xs uppercase">ATTENDEES</p>
          </div>
          <div>
            <h2 className="text-xl font-bold sm:text-2xl"> {totalCategories} </h2>
            <p className="text-xs uppercase">Categories</p>
          </div>
          <div>
            <h2 className="text-xl font-bold sm:text-2xl"> Free </h2>
            <p className="text-xs uppercase">to browse</p>
          </div>
        </div>
      )}

      {/* Category Section */}
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-3 px-4 py-6">
        {categories.map((category) => (
          <Button
            key={category.id}
            bgColorClass="bg-white"
            textColorClass="text-black"
            className="rounded-full border px-4 py-2 text-sm whitespace-nowrap"
            style={{ borderColor: category.color }}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Event Section */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pb-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading && <p className="col-span-full text-center text-gray-500">Loading events...</p>}
        {error && <p className="col-span-full text-center text-red-500">{error}</p>}
        {!loading && !error && events.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </section>
  )
}

export default EventBrowser