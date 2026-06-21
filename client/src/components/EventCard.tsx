import heroBG from '../assets/hero-bg.png'
import Button from './Button'

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
    <div className="overflow-hidden rounded-3xl border bg-white shadow-md">
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

      <div className="space-y-3 p-5">
        <h3 className="text-xl font-bold">{event.title}</h3>

        <p className="text-gray-500">
          {formattedDate} • {formattedTime}
        </p>

        <p className="font-semibold" style={{ color: event.category.color }}>
          {event.category.name}
        </p>

        <p className="text-gray-500">{event.venue}</p>

        <Button
          bgColorClass="bg-blue-600"
          className="w-full rounded-xl py-3 font-semibold"
        >
          Request to Join
        </Button>
      </div>
    </div>
  )
}

export default EventCard