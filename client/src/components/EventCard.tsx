import heroBG from '../assets/hero-bg.png'
import Button from './Button'
import { FiCalendar, FiGlobe } from 'react-icons/fi'

export interface EventItem {
  id: string
  user_id: string
  title: string
  description: string
  date: string
  venue: string
  capacity: number
  price: string
  banner_image: string | null
  category: {
    id: string
    name: string
    color: string
  }
}

interface EventCardProps {
  event: EventItem
}

function EventCard({ event }: EventCardProps) {
  const price =
    Number(event.price) === 0 ? 'Free' : `₱${Number(event.price).toLocaleString()}`

  const date = new Date(event.date)

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <div className="flex flex-col h-full overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-md">
      <div className="relative h-56">
        <img
          src={event.banner_image || heroBG}
          alt={event.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute right-3 top-3 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">
          {price}
        </div>

        <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-sm font-semibold text-white">
          {event.capacity} slots left
        </div>
      </div>

      <div className="flex flex-col flex-1 space-y-3 p-5">
        <h3 className="text-xl font-bold">{event.title}</h3>

        <p className="flex items-center justify-left gap-2 text-gray-500">
          <FiCalendar className="w-3.5 h-3.5" /> {formattedDate} • {formattedTime}
        </p>

        <p className="font-semibold" style={{ color: event.category.color }}>
          {event.category.name}
        </p>

        <p className="flex items-center justify-left gap-2 text-gray-500">
          <FiGlobe className="w-3.5 h-3.5" /> {event.venue}
        </p>

        <div className="mt-auto pt-2">
            <Button
              bgColorClass="bg-blue-600"
              className="w-full rounded-xl py-3 font-semibold"
            >
              Request to Join
            </Button>
        </div>
      </div>
    </div>
  )
}

export default EventCard